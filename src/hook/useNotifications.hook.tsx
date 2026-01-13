import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { INotification } from "@/@types/notification.types";
import { apiRequest } from "@/utils/apiRequest";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function to get JWT token from cookie
const getTokenFromCookie = (): string | null => {
  const cookies = document.cookie.split("; ");
  console.log("🍪 All cookies:", document.cookie);
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  console.log("🔑 Token cookie found:", tokenCookie ? "Yes" : "No");
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const useNotifications = (userId: string | undefined) => {
  const socketRef = useRef<Socket | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await apiRequest<{ notifications: INotification[] }>(
        "GET",
        "/notifications"
      );
      const normalizedNotifications = response.notifications.map((notif) => ({
        ...notif,
        timestamp: notif.timestamp ? new Date(notif.timestamp) : new Date(),
        createdAt: notif.createdAt
          ? new Date(notif.createdAt)
          : notif.timestamp
          ? new Date(notif.timestamp)
          : new Date(),
      }));
      setNotifications(normalizedNotifications);
      setUnreadCount(normalizedNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [userId]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await apiRequest("PATCH", `/notifications/${notificationId}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      await apiRequest("PATCH", "/notifications/read-all");
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    if (!userId) return;

    const token = getTokenFromCookie();
    if (!token) {
      console.error(
        "❌ No JWT token found in cookie - Socket.IO cannot authenticate"
      );
      console.log(
        "💡 This usually means the token is httpOnly or stored elsewhere"
      );
      return;
    }

    console.log("🔌 Connecting to Socket.IO with token...");
    const socketInstance = io(SOCKET_URL, {
      auth: {
        token, // ✅ Send JWT token, not userId
      },
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log(
        "✅ Socket connected successfully! Socket ID:",
        socketInstance.id
      );
      console.log("👤 User room joined:", userId);
    });

    socketInstance.on(
      "notification",
      (notification: {
        _id?: string;
        type: string;
        message: string;
        data?: Record<string, unknown>;
        timestamp: string | Date;
      }) => {
        console.log("📬 Notification received:", notification);
        const normalizedNotification: INotification = {
          _id: notification._id || Date.now().toString(),
          type: notification.type,
          message: notification.message,
          data: notification.data,
          timestamp: notification.timestamp
            ? new Date(notification.timestamp)
            : new Date(),
          read: false,
          createdAt: notification.timestamp
            ? new Date(notification.timestamp)
            : new Date(),
        };
        setNotifications((prev) => [normalizedNotification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      }
    );

    socketInstance.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      console.log(
        "💡 Check if token is valid and backend Socket.IO is running"
      );
    });

    socketRef.current = socketInstance;

    // Fetch initial notifications
    void fetchNotifications();

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications,
  };
};

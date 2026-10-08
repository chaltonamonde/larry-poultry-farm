import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FarmOrder,
  FarmTransaction,
  CustomerInquiryMessage,
  WholesaleLeadRecord,
  FlockHealthMetrics,
  OrderStatus,
  Product,
  ChickBatch
} from '../types';
import { PRODUCTS } from '../data/products';
import { CHICK_BATCHES } from '../data/chickBatches';
import {
  INITIAL_FARM_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_MESSAGES,
  INITIAL_WHOLESALE_LEADS,
  INITIAL_FLOCK_METRICS
} from '../data/mockAdminData';

export type AdminTab =
  | 'overview'
  | 'finance'
  | 'orders'
  | 'hatchery'
  | 'inventory'
  | 'wholesale'
  | 'messages'
  | 'settings';

interface AdminContextType {
  isAuthenticated: boolean;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  login: (pin: string) => boolean;
  logout: () => void;
  
  // Data State
  orders: FarmOrder[];
  transactions: FarmTransaction[];
  messages: CustomerInquiryMessage[];
  wholesaleLeads: WholesaleLeadRecord[];
  flockMetrics: FlockHealthMetrics;
  products: Product[];
  chickBatches: ChickBatch[];

  // Action Handlers
  addOrder: (order: Omit<FarmOrder, 'id' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNotes?: string, driverName?: string) => void;
  addTransaction: (tx: Omit<FarmTransaction, 'id' | 'date'>) => void;
  addCustomerMessage: (msg: Omit<CustomerInquiryMessage, 'id' | 'date' | 'status'>) => void;
  markMessageStatus: (id: string, status: CustomerInquiryMessage['status'], replyNotes?: string) => void;
  toggleMessageStar: (id: string) => void;
  addWholesaleLead: (lead: Omit<WholesaleLeadRecord, 'id' | 'date' | 'status'>) => void;
  updateWholesaleLeadStatus: (id: string, status: WholesaleLeadRecord['status'], notes?: string) => void;
  updateProductStock: (productId: string, stockCountApprox: number, availability: Product['availability']) => void;
  updateProductPrice: (productId: string, priceKes: number) => void;
  updateFlockMetrics: (updates: Partial<FlockHealthMetrics>) => void;
  updateChickBatch: (batchId: string, updates: Partial<ChickBatch>) => void;
  resetAllToDemoData: () => void;
  exportReportJson: () => void;

  // Computed Badges
  pendingOrdersCount: number;
  unreadMessagesCount: number;
  newWholesaleCount: number;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'LPF_ADMIN_AUTH_V1',
  ORDERS: 'LPF_ADMIN_ORDERS_V1',
  TRANSACTIONS: 'LPF_ADMIN_TXNS_V1',
  MESSAGES: 'LPF_ADMIN_MSGS_V1',
  WHOLESALE: 'LPF_ADMIN_WHOLESALE_V1',
  FLOCK: 'LPF_ADMIN_FLOCK_V1',
  PRODUCTS: 'LPF_ADMIN_PRODUCTS_V1',
  BATCHES: 'LPF_ADMIN_BATCHES_V1'
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');

  const [orders, setOrders] = useState<FarmOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_FARM_ORDERS;
  });

  const [transactions, setTransactions] = useState<FarmTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [messages, setMessages] = useState<CustomerInquiryMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [wholesaleLeads, setWholesaleLeads] = useState<WholesaleLeadRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WHOLESALE);
    return saved ? JSON.parse(saved) : INITIAL_WHOLESALE_LEADS;
  });

  const [flockMetrics, setFlockMetrics] = useState<FlockHealthMetrics>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FLOCK);
    return saved ? JSON.parse(saved) : INITIAL_FLOCK_METRICS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [chickBatches, setChickBatches] = useState<ChickBatch[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BATCHES);
    return saved ? JSON.parse(saved) : CHICK_BATCHES;
  });

  // Persist Changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WHOLESALE, JSON.stringify(wholesaleLeads));
  }, [wholesaleLeads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FLOCK, JSON.stringify(flockMetrics));
  }, [flockMetrics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(chickBatches));
  }, [chickBatches]);

  // Auth
  const login = (pin: string) => {
    const validPins = ['1234', 'larry2026', 'admin'];
    if (validPins.includes(pin.trim())) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Order Operations
  const addOrder = (orderData: Omit<FarmOrder, 'id' | 'createdAt'>): string => {
    const newId = `LPF-${Math.floor(9100 + Math.random() * 899)}`;
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: FarmOrder = {
      ...orderData,
      id: newId,
      createdAt: timeStr
    };

    setOrders(prev => [newOrder, ...prev]);

    // Also auto-record financial income if paid via M-Pesa
    if (newOrder.paymentStatus === 'paid-mpesa' || newOrder.paymentStatus === 'paid-bank') {
      const newTx: FarmTransaction = {
        id: `TXN-${Math.floor(4100 + Math.random() * 899)}`,
        date: timeStr,
        type: 'income',
        category: 'Online Checkout Orders',
        description: `Order #${newId} (${newOrder.customerName})`,
        amountKes: newOrder.grandTotalKes,
        paymentChannel: newOrder.paymentMethod === 'mpesa' ? 'M-Pesa STK' : 'Bank Transfer',
        referenceCode: newOrder.mpesaReceiptCode || `AUT-${Math.floor(100000 + Math.random() * 900000)}`,
        recordedBy: 'Automated Gateway',
        orderId: newId
      };
      setTransactions(prev => [newTx, ...prev]);
    }

    return newId;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    trackingNotes?: string,
    driverName?: string
  ) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNotes: trackingNotes ?? ord.trackingNotes,
            driverName: driverName ?? ord.driverName
          };
        }
        return ord;
      })
    );
  };

  // Transaction Operations
  const addTransaction = (tx: Omit<FarmTransaction, 'id' | 'date'>) => {
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newTx: FarmTransaction = {
      ...tx,
      id: `TXN-${Math.floor(4200 + Math.random() * 799)}`,
      date: timeStr
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  // Message Operations
  const addCustomerMessage = (msg: Omit<CustomerInquiryMessage, 'id' | 'date' | 'status'>) => {
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newMsg: CustomerInquiryMessage = {
      ...msg,
      id: `MSG-${Math.floor(310 + Math.random() * 680)}`,
      date: timeStr,
      status: 'unread'
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const markMessageStatus = (
    id: string,
    status: CustomerInquiryMessage['status'],
    replyNotes?: string
  ) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, status, replyNotes: replyNotes ?? m.replyNotes } : m))
    );
  };

  const toggleMessageStar = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  // Wholesale Operations
  const addWholesaleLead = (lead: Omit<WholesaleLeadRecord, 'id' | 'date' | 'status'>) => {
    const now = new Date();
    const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newLead: WholesaleLeadRecord = {
      ...lead,
      id: `WHL-${Math.floor(510 + Math.random() * 480)}`,
      date: timeStr,
      status: 'new'
    };
    setWholesaleLeads(prev => [newLead, ...prev]);
  };

  const updateWholesaleLeadStatus = (
    id: string,
    status: WholesaleLeadRecord['status'],
    notes?: string
  ) => {
    setWholesaleLeads(prev =>
      prev.map(lead =>
        lead.id === id
          ? { ...lead, status, accountManagerNotes: notes ?? lead.accountManagerNotes }
          : lead
      )
    );
  };

  // Product & Stock Operations
  const updateProductStock = (
    productId: string,
    stockCountApprox: number,
    availability: Product['availability']
  ) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stockCountApprox, availability } : p))
    );
  };

  const updateProductPrice = (productId: string, priceKes: number) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, priceKes } : p)));
  };

  const updateFlockMetrics = (updates: Partial<FlockHealthMetrics>) => {
    setFlockMetrics(prev => ({ ...prev, ...updates }));
  };

  const updateChickBatch = (batchId: string, updates: Partial<ChickBatch>) => {
    setChickBatches(prev => prev.map(b => (b.id === batchId ? { ...b, ...updates } : b)));
  };

  const resetAllToDemoData = () => {
    setOrders(INITIAL_FARM_ORDERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setMessages(INITIAL_MESSAGES);
    setWholesaleLeads(INITIAL_WHOLESALE_LEADS);
    setFlockMetrics(INITIAL_FLOCK_METRICS);
    setProducts(PRODUCTS);
    setChickBatches(CHICK_BATCHES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.WHOLESALE);
    localStorage.removeItem(STORAGE_KEYS.FLOCK);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.BATCHES);
  };

  const exportReportJson = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      farm: 'Larry Poultry Farm Ruiru Main Facility',
      financials: {
        totalIncomeKes: transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amountKes, 0),
        totalExpensesKes: transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amountKes, 0),
        transactionsCount: transactions.length
      },
      orders: orders,
      inventory: products.map(p => ({ id: p.id, name: p.name, price: p.priceKes, stock: p.stockCountApprox })),
      flockMetrics
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `larry_poultry_farm_ops_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Badges
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;
  const newWholesaleCount = wholesaleLeads.filter(w => w.status === 'new').length;

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        activeAdminTab,
        setActiveAdminTab,
        login,
        logout,
        orders,
        transactions,
        messages,
        wholesaleLeads,
        flockMetrics,
        products,
        chickBatches,
        addOrder,
        updateOrderStatus,
        addTransaction,
        addCustomerMessage,
        markMessageStatus,
        toggleMessageStar,
        addWholesaleLead,
        updateWholesaleLeadStatus,
        updateProductStock,
        updateProductPrice,
        updateFlockMetrics,
        updateChickBatch,
        resetAllToDemoData,
        exportReportJson,
        pendingOrdersCount,
        unreadMessagesCount,
        newWholesaleCount
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'employee' | 'admin';
  avatar?: string;
  balance?: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  clientId: string;
  service: string;
  platform: string;
  link: string;
  quantity: number;
  price: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  progress: number;
  createdAt: Date;
  completedAt?: Date;
}

export interface Task {
  id: string;
  orderId: string;
  employeeId?: string;
  type: 'view' | 'like' | 'comment' | 'follow';
  platform: string;
  link: string;
  reward: number;
  status: 'available' | 'assigned' | 'completed';
  createdAt: Date;
  completedAt?: Date;
}

export interface Payment {
  id: string;
  userId: string;
  type: 'order' | 'payout';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

// Mock Users
export let mockUsers: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'client',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jean',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    role: 'employee',
    balance: 245.50,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marie',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    createdAt: new Date('2023-12-01'),
  },
];

// Mock Orders
export let mockOrders: Order[] = [
  {
    id: 'ORD001',
    clientId: '1',
    service: '1000 Vues Instagram',
    platform: 'instagram',
    link: 'https://instagram.com/p/example1',
    quantity: 1000,
    price: 29.99,
    status: 'in_progress',
    progress: 65,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'ORD002',
    clientId: '1',
    service: '500 Likes Facebook',
    platform: 'facebook',
    link: 'https://facebook.com/post/example2',
    quantity: 500,
    price: 19.99,
    status: 'completed',
    progress: 100,
    createdAt: new Date('2024-03-08'),
    completedAt: new Date('2024-03-09'),
  },
];

// Mock Tasks
export let mockTasks: Task[] = [
  {
    id: 'TASK001',
    orderId: 'ORD001',
    type: 'view',
    platform: 'instagram',
    link: 'https://instagram.com/p/example1',
    reward: 0.05,
    status: 'available',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'TASK002',
    orderId: 'ORD001',
    employeeId: '2',
    type: 'like',
    platform: 'instagram',
    link: 'https://instagram.com/p/example1',
    reward: 0.08,
    status: 'completed',
    createdAt: new Date('2024-03-10'),
    completedAt: new Date('2024-03-10'),
  },
];

// Mock Payments
export let mockPayments: Payment[] = [
  {
    id: 'PAY001',
    userId: '1',
    type: 'order',
    amount: 29.99,
    status: 'completed',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'PAY002',
    userId: '2',
    type: 'payout',
    amount: 50.00,
    status: 'completed',
    createdAt: new Date('2024-03-05'),
  },
];

// Current logged in user (mock authentication)
export let currentUser: User = mockUsers[0];

export const setCurrentUser = (user: User) => {
  currentUser = user;
};

// Helper functions
export const addOrder = (order: Order) => {
  mockOrders.push(order);
};

export const updateOrder = (orderId: string, updates: Partial<Order>) => {
  const index = mockOrders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    mockOrders[index] = { ...mockOrders[index], ...updates };
  }
};

export const addTask = (task: Task) => {
  mockTasks.push(task);
};

export const updateTask = (taskId: string, updates: Partial<Task>) => {
  const index = mockTasks.findIndex(t => t.id === taskId);
  if (index !== -1) {
    mockTasks[index] = { ...mockTasks[index], ...updates };
  }
};

export const addPayment = (payment: Payment) => {
  mockPayments.push(payment);
};

export const getOrdersByUserId = (userId: string) => {
  return mockOrders.filter(o => o.clientId === userId);
};

export const getTasksByEmployeeId = (employeeId: string) => {
  return mockTasks.filter(t => t.employeeId === employeeId);
};

export const getAvailableTasks = () => {
  return mockTasks.filter(t => t.status === 'available');
};

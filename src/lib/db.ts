import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'local-db.json');

// Initialize empty DB if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ bookings: [], aiPlans: [] }, null, 2));
}

function readDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

function writeDB(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export const db = {
  booking: {
    findMany: async () => {
      const data = readDB();
      return data.bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: async ({ data: newData }: any) => {
      const data = readDB();
      const booking = {
        id: Math.random().toString(36).substring(2, 9),
        ...newData,
        createdAt: new Date().toISOString()
      };
      data.bookings.push(booking);
      writeDB(data);
      return booking;
    },
    update: async ({ where, data: updateData }: any) => {
      const data = readDB();
      const index = data.bookings.findIndex((b: any) => b.id === where.id);
      if (index !== -1) {
        data.bookings[index] = { ...data.bookings[index], ...updateData };
        writeDB(data);
        return data.bookings[index];
      }
      throw new Error('Booking not found');
    }
  },
  aiPlan: {
    findMany: async () => {
      const data = readDB();
      return data.aiPlans.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: async ({ data: newData }: any) => {
      const data = readDB();
      const plan = {
        id: Math.random().toString(36).substring(2, 9),
        ...newData,
        createdAt: new Date().toISOString()
      };
      data.aiPlans.push(plan);
      writeDB(data);
      return plan;
    }
  }
};

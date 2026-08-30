import { db as firestore } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  getDoc
} from 'firebase/firestore';

export const db = {
  booking: {
    findMany: async () => {
      const q = query(collection(firestore, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const bookings: any[] = [];
      querySnapshot.forEach((doc: any) => {
        bookings.push({ id: doc.id, ...doc.data() });
      });
      return bookings;
    },
    create: async ({ data: newData }: any) => {
      const id = Math.random().toString(36).substring(2, 9);
      const bookingData = {
        ...newData,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(firestore, 'bookings', id), bookingData);
      return { id, ...bookingData };
    },
    update: async ({ where, data: updateData }: any) => {
      const docRef = doc(firestore, 'bookings', where.id);
      
      // Update the document in Firestore
      await updateDoc(docRef, updateData);
      
      // Fetch and return the updated document
      const updatedDoc = await getDoc(docRef);
      if (!updatedDoc.exists()) {
        throw new Error('Booking not found');
      }
      return { id: updatedDoc.id, ...updatedDoc.data() };
    }
  },
  aiPlan: {
    findMany: async () => {
      const q = query(collection(firestore, 'aiPlans'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const plans: any[] = [];
      querySnapshot.forEach((doc: any) => {
        plans.push({ id: doc.id, ...doc.data() });
      });
      return plans;
    },
    create: async ({ data: newData }: any) => {
      const id = Math.random().toString(36).substring(2, 9);
      const planData = {
        ...newData,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(firestore, 'aiPlans', id), planData);
      return { id, ...planData };
    }
  }
};

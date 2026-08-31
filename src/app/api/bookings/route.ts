import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const bookings = await db.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Destructure fields from both Booking form and Contact form
    const { eventType, date, guests, budget, userId, name, phone, message } = body;

    const newBooking = await db.booking.create({
      data: {
        eventType: eventType || null,
        date: date || null,
        guests: guests || null,
        budget: budget || null,
        userId: userId || null,
        clientName: name || null,
        phone: phone || null,
        message: message || null,
        status: "Pending",
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updatedBooking = await db.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

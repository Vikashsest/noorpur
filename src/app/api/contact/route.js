import connectMongo from '@/db/db';
import Contact from '@/models/contactModels';
import { NextResponse } from 'next/server';
connectMongo();

export const GET = async (req) => {
  try {
    return NextResponse.json({ savedContact, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Issue', success: false },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { name, email, phone, subject, message } = body;

    // Validation - basic check
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required', success: false },
        { status: 400 }
      );
    }

    // Create new contact
    const savedContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { message: 'Contact saved successfully', savedContact, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
};

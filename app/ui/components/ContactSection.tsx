"use client";

import { useState, useRef, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import Link from "next/link";

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string;
}

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const formD = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function call() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("");
    }
    call();
  }, [message]);

  const contactInfo: ContactInfo[] = [
    {
      icon: <FiMapPin className="h-6 w-6 text-emerald-500" />,
      title: "Location",
      details: "India, Kolkata.",
    },
    {
      icon: <CiMail className="h-6 w-6 text-emerald-500" />,
      title: "E-mail",
      details: "workdebjeet@gmail.com",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget); // Grab form data
    const data = Object.fromEntries(formData.entries());

    setSending(true);
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 444433));
      const result = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await result.json();
      console.log(response);
      if (response.success) {
        formD?.current?.reset();
        setMessage(response.message);
      }
    } catch (err) {
      console.log(err);
      setMessage("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {message || sending ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <p className="mt-2 text-4xl font-semibold text-center text-emerald-500 ">
            {message || 'Sending...'}
          </p>
        </div>
      ) : (
        <div className=" px-6 py-6" id="contact">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 backdrop-blur-sm mb-3">
              <CiMail className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-zinc-200">CONTACT</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 lg:mb-8">
              Contact <span className="text-emerald-500">Me.</span>
            </h2>
            <p className="text-slate-900 text-lg mb-4 lg:mb-8 max-w-2xl">
              Wanna hire me, please send massage through this form or by sending
              an email on{" "}
              <Link
                href={`mailto:${contactInfo[1].details}`}
                className="text-emerald-500 font-semibold"
              >
                {contactInfo[1].details}
              </Link>
            </p>

            <div className="grid lg:grid-cols-2 gap-2 lg:gap-8">
              <div className="space-y-3 lg:space-y-8 mb-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-zinc-900/50 backdrop-blur-sm">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {info.title}
                      </h3>
                      <p className="text-slate-900">{info.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} ref={formD} className="space-y-2 lg:space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  disabled={sending}
                  className="rounded-md bg-slate-800 text-white  block w-full p-2.5"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  disabled={sending}
                  className="rounded-md bg-slate-800 text-white border border-black block w-full p-2.5"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  required
                  disabled={sending}
                  className="rounded-md bg-slate-800 text-white block w-full p-2.5"
                />
                <div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 md:px-8 md;py-3"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

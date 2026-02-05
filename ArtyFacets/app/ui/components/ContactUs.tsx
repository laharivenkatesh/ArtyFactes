"use client";
import { useState } from "react";
import { ContactMail } from "../../lib/mails";
import { MessageCircleQuestion, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true);
      await ContactMail(formData);
      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus({ success: false, message: "" });
      }, 5000);
    }
  }

  return (
    <div id="contact-us" className="bg-teal-700 py-16">
      <section className="max-w-5xl mx-auto p-5 lg:p-8">
        <div className="w-full text-5xl font-medium pt-10 text-white mb-2">
          Reach Out Anytime
        </div>
        <div className="w-full text-3xl text-orange-400 pb-6">
          We&#39;d love to hear from you!
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="text-md font-light text-gray-200 max-w-lg">
              <p className="text-justify leading-relaxed">
                Whether you have questions about our diploma courses or need
                more information, feel free to reach out and we&#39;ll get back
                to you promptly.
              </p>
            </div>

            <Link
              href={"https://wa.me/+919880028287"}
              className="text-gray-200 flex items-center hover:text-orange-400 transition-colors group"
            >
              <div className="bg-teal-800 p-3 rounded-full group-hover:bg-teal-900 transition-colors">
                <MessageCircleQuestion size={28} className="text-white" />
              </div>
              <div className="ml-4">
                <div className="font-medium">General Enquiries</div>
                <div className="text-sm opacity-80">
                  Chat with us on WhatsApp
                </div>
              </div>
            </Link>

            <Link
              href={"tel:+919880028287"}
              className="text-gray-200 flex items-center hover:text-orange-400 transition-colors group"
            >
              <div className="bg-teal-800 p-3 rounded-full group-hover:bg-teal-900 transition-colors">
                <Phone size={28} className="text-white" />
              </div>
              <div className="ml-4">
                <div className="font-medium">Call Us</div>
                <div className="text-sm opacity-80">+91 98800 28287</div>
              </div>
            </Link>
          </div>

          <div>
            <div className="flex justify-center mt-8">
              <form
                className="w-full max-w-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl border border-yellow-700 shadow-xl"
                action={handleSubmit}
              >
                {submitStatus.message && (
                  <div
                    className={`mb-4 p-3 rounded-md text-center ${
                      submitStatus.success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full inline-flex">
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        htmlFor="name"
                        className="block text-lg font-medium mb-2 text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border border-yellow-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        value={form.name}
                        required
                        placeholder="Your name"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        htmlFor="phone"
                        className="block text-lg font-medium mb-2 text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full border border-yellow-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                        value={form.phone}
                        required
                        placeholder="Your phone number"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium mb-2 text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border border-yellow-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={form.email}
                      required
                      placeholder="Your email address"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      htmlFor="message"
                      className="block text-lg font-medium mb-2 text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full border border-yellow-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-600"
                      value={form.message}
                      required
                      placeholder="How can we help you?"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition-colors shadow-md disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h3 className="text-xl text-white mb-4 mt-8">Our Main Location</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7778.73507169917!2d77.5723139!3d12.8840722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1546755c796d%3A0xcea8886cf5411c76!2sArty%20Facets%20Music%2C%20Dance%2C%20Art%20%26%20Yoga!5e0!3m2!1sen!2sin!4v1729757013383!5m2!1sen!2sin"
              width="100%"
              height="300"
              loading="lazy"
              title="Arty Facets Music, Dance, Art & Yoga"
              className="rounded-xl shadow-md border border-teal-600"
            />
            <p className="text-gray-200 text-sm mt-2">
              Arty Facets Music, Dance, Art & Yoga
            </p>
          </div>
          <div>
            <h3 className="text-xl text-white mb-4 mt-8">
              Our Branch Location
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5509976584153!2d77.5784473!3d12.872251400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6ab38e220aaf%3A0xb2cb531afcaf5cd1!2sGokulam%20Apartment!5e0!3m2!1sen!2sin!4v1729791917292!5m2!1sen!2sin"
              width="100%"
              height="300"
              loading="lazy"
              title="Gokulam Apartment Branch"
              className="rounded-xl shadow-md border border-teal-600"
            />
            <p className="text-gray-200 text-sm mt-2">
              Gokulam Apartment Branch
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

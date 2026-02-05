"use client";
import { useState, useEffect } from "react";
import { Button } from "../../ui/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function TermsAndConditions() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show back-to-top button only when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-yellow-50 to-white text-yellow-900">
      <header className="bg-yellow-400 p-6 text-center sticky top-0 z-10 shadow-md transition-all">
        <h1 className="text-3xl font-bold">
          Arty Facets – Terms and Conditions for Enrollment
        </h1>
      </header>
      <main className="h-full p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <section id="eligibility" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              1. Eligibility and Enrollment
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Classes are open to all age groups, including children, teens,
                and adults. Specific age requirements may apply for different
                courses.
              </li>
              <li>
                A one-time admission fee must be paid upon enrollment. If a
                student takes a break for more than 3 months, they will need to
                repay the admission fee upon rejoining.
              </li>
            </ul>
          </section>

          <section id="trial" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              2. Trial Classes
            </h2>
            <p>
              A one-hour trial class is available before committing to full
              enrollment.
            </p>
          </section>

          <section id="materials" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              3. Course Materials
            </h2>
            <p>
              Fine art course materials will be provided based on the course
              selected. Contact the institute for details.
            </p>
          </section>

          <section id="courses" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              4. Course Offerings
            </h2>
            <p>Available courses include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Diploma for adults and children</li>
              <li>Hobby classes and certification courses</li>
              <li>Visual arts (graphic design)</li>
              <li>Fabric painting</li>
              <li>Indian art (certification courses)</li>
            </ul>
          </section>

          <section id="workshops" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              5. Workshops
            </h2>
            <p>
              Workshops are conducted periodically. Updates will be available on
              Arty Facets&apos; website and social media pages.
            </p>
          </section>

          <section id="fees" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              6. Fee Payment and Refund Policy
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fees must be paid in advance by the 5th of every month.</li>
              <li>
                Classical dance and music fees are non-refundable and must be
                paid in full, even if the student takes a break for the entire
                month.
              </li>
              <li>
                Fine arts students can take a break for a month, but if they
                attend even one class during that month, the full fee is
                applicable.
              </li>
              <li>
                Once paid, fees are non-refundable under any circumstances.
              </li>
            </ul>
          </section>

          <section id="missed" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              7. Compensation for Missed Classes
            </h2>
            <p>
              Compensation classes are available subject to batch availability.
            </p>
          </section>

          <section id="hourly" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              8. Hourly-Based Classes
            </h2>
            <p>
              Some courses may be available on an hourly basis. Contact Arty
              Facets for further details.
            </p>
          </section>

          <section id="hours" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              9. Working Hours
            </h2>
            <p>
              The institute is open every day. Students must schedule an
              appointment before visiting.
            </p>
          </section>

          <section id="certification" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              10. Certification and Exams
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Arty Facets is affiliated with Pracheen Kala Kendra and offers
                Diploma Certificates.
              </li>
              <li>
                Additional certifications are available for various courses.
              </li>
            </ul>
          </section>

          <section id="exhibitions" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              11. Exhibitions and Performances
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Students will have opportunities to perform at Arty Facets
                events and other stages.
              </li>
              <li>Art exhibitions are conducted for fine arts students.</li>
            </ul>
          </section>

          <section id="conduct" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              12. Code of Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Students must maintain discipline and respect instructors and
                peers.
              </li>
              <li>
                Any damage to institute property will be the responsibility of
                the student.
              </li>
              <li>
                The institute reserves the right to dismiss students for
                misconduct without a refund.
              </li>
            </ul>
          </section>

          <section id="contact" className="bg-white p-6 rounded-lg shadow-sm border border-yellow-100">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-yellow-100">
              13. Contact Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Official website:{" "}
                <a
                  href="https://www.artyfacets.com"
                  className="text-yellow-700 hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.artyfacets.com
                </a>
              </li>
              <li>Social media: @artyfacets</li>
            </ul>
          </section>

          <div className="text-center text-sm text-gray-600 mt-8 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </main>

      {isVisible && (
        <Button
          className="fixed bottom-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-lg z-10 rounded-full p-3 h-auto"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
          <span className="ml-1">Top</span>
        </Button>
      )}
    </div>
  );
}

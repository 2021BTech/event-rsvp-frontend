import { Link } from "react-router-dom";
import { FaRocket, FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";
import hero from "../../assets/image/img-1.avif";
import feature from "../../assets/image/img-2.avif";
import man from "../../assets/image/man.png";
import woman from "../../assets/image/woman.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="People at an event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full text-white py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <FaRocket className="text-secondary text-2xl" />
                <span className="font-semibold">EVENTFLOW</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Streamline Your Events with Effortless RSVP Management
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Create, manage, and track events with our all-in-one event
                management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition text-center"
                >
                  Get Started - It's Free
                </Link>
                <Link
                  to="/auth"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Optional decorative element */}
            <div className="md:w-1/2 hidden md:flex items-center justify-center relative">
              <div className="relative h-64 w-full">
                {/* Timeline line */}
                <div className="absolute top-1/2 left-1/2 w-3/4 h-1 bg-white/30 transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Timeline items */}
                <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-primary rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-secondary rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-3/4 left-3/4 w-6 h-6 bg-white rounded-full border-4 border-primary transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Labels */}
                <div className="absolute top-1/4 left-1/4 text-xs text-white font-medium transform translate-x-4 -translate-y-1/2">
                  Plan
                </div>
                <div className="absolute top-1/2 left-1/2 text-xs text-white font-medium transform translate-x-6 -translate-y-1/2">
                  Invite
                </div>
                <div className="absolute top-3/4 left-3/4 text-xs text-white font-medium transform translate-x-4 -translate-y-1/2">
                  Celebrate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaCalendarAlt className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Event Creation</h3>
              <p className="text-gray-600">
                Easily create and customize events with beautiful invitations
                and automated reminders.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Guest Management</h3>
              <p className="text-gray-600">
                Track RSVPs, manage guest lists, and send updates with just a
                few clicks.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
              <p className="text-gray-600">
                Get insights on attendance, engagement, and more with our
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            How EventFlow Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create Your Event</h3>
              <p className="text-gray-600">
                Set up your event details, dates, and customize your invitation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Invite Guests</h3>
              <p className="text-gray-600">
                Send invitations via email or shareable links with your
                attendees.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Manage RSVPs</h3>
              <p className="text-gray-600">
                Track responses, send reminders, and get real-time updates.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <img
              src={feature}
              alt="Event dashboard example"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary mr-4">
                  <img
                    src={woman}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-300">Event Planner</p>
                </div>
              </div>
              <p className="text-indigo-50">
                "EventFlow has transformed how I manage corporate events. The
                RSVP tracking saves me hours every week!"
              </p>
            </div>
            <div className="bg-white bg-opacity-10 p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary mr-4">
                  <img
                    src={man}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-300">Wedding Coordinator</p>
                </div>
              </div>
              <p className="text-indigo-50">
                "From small gatherings to 300+ guest weddings, EventFlow handles
                everything seamlessly. Highly recommend!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Simplify Your Events?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of event organizers who trust EventFlow for seamless
            RSVP management.
          </p>
          <Link
            to="/auth"
            className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

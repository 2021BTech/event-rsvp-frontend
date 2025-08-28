import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiUsers } from "react-icons/fi";
import type { EventAttendee } from "../../models/components/eventCard.model";
import EventService from "../../services/event.service";
import { ReusableTable } from "../../components/ReusableTable";
import PaginationControls from "../../components/PaginationControls";
import { showToast } from "../../utils/Toast";

const EventSummaryPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventTitle, setEventTitle] = useState("Event");
  const [summary, setSummary] = useState({ going: 0, maybe: 0, cantGo: 0 });
  const [attendees, setAttendees] = useState<EventAttendee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const pageSize = 10;

  const fetchEventDetails = async () => {
    if (!eventId) return;
    
    setEventLoading(true);
    try {
      const response = await EventService.getEventById(eventId);
      if (response) {
        setEventTitle(response.title);
      }
    } catch (error) {
      console.error("Failed to fetch event details", error);
      showToast("error", "Failed to load event details");
    } finally {
      setEventLoading(false);
    }
  };

  const fetchSummary = async (currentPage: number, filter: string) => {
    if (!eventId) return;

    setLoading(true);
    try {
      const response = await EventService.getEventRsvpSummary(
        eventId,
        filter !== "all" ? filter : undefined,
        currentPage,
        pageSize
      );
      if (response) {
        setSummary(response.summary);
        setAttendees(response.attendees);
        setTotal(response.total);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch event summary", error);
      showToast("error", "Failed to load event summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
      fetchSummary(page, statusFilter);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchSummary(page, statusFilter);
    }
  }, [page, statusFilter, eventId]);

  const handleStatusFilterChange = (newFilter: string) => {
    setStatusFilter(newFilter);
    setPage(1);
  };

  if (eventLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-10 text-gray-500">Loading event details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <Link
          to="/events"
          className="flex items-center text-indigo-600 hover:text-indigo-800 mr-4"
        >
          <FiArrowLeft className="mr-2" /> Back to Events
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Event Summary: {eventTitle}</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
            statusFilter === "Going" ? "border-green-500" : "border-green-300"
          } cursor-pointer transition-all hover:shadow-lg`}
          onClick={() => handleStatusFilterChange("Going")}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Going</h3>
            <span className="text-2xl font-bold text-green-600">{summary.going}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Confirmed attendees</p>
        </div>

        <div 
          className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
            statusFilter === "Maybe" ? "border-yellow-500" : "border-yellow-300"
          } cursor-pointer transition-all hover:shadow-lg`}
          onClick={() => handleStatusFilterChange("Maybe")}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Maybe</h3>
            <span className="text-2xl font-bold text-yellow-600">{summary.maybe}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tentative attendees</p>
        </div>

        <div 
          className={`bg-white shadow-md rounded-lg p-4 border-l-4 ${
            statusFilter === "Can't Go" ? "border-red-500" : "border-red-300"
          } cursor-pointer transition-all hover:shadow-lg`}
          onClick={() => handleStatusFilterChange("Can't Go")}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Can't Go</h3>
            <span className="text-2xl font-bold text-red-600">{summary.cantGo}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Declined invitations</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="all">All Attendees</option>
            <option value="Going">Going</option>
            <option value="Maybe">Maybe</option>
            <option value="Can't Go">Can't Go</option>
          </select>
        </div>
        
        <div className="ml-auto">
          <div className="bg-indigo-50 shadow-md rounded-lg p-4 flex items-center">
            <div className="mr-3">
              <h3 className="text-sm font-semibold text-indigo-800">Total Filtered</h3>
              <p className="text-xs text-indigo-600">Based on current filter</p>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{total}</span>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading attendees...
        </div>
      ) : attendees.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No attendees</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter !== "all" 
              ? `No attendees found with status "${statusFilter}".` 
              : "No attendees have registered for this event yet."}
          </p>
        </div>
      ) : (
        <>
          <ReusableTable<EventAttendee>
            data={attendees}
            columns={[
              {
                label: "#",
                key: "_id",
                className: "pl-4 pr-3 sm:pl-6",
                render: (_val, _row, index) => (page - 1) * pageSize + index + 1,
              },
              { label: "Name", key: "name" },
              { label: "Email", key: "email" },
              {
                label: "Status",
                key: "status",
                render: (status) => {
                  const s = status as string;
                  return (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        s === "Going"
                          ? "bg-green-100 text-green-700"
                          : s === "Maybe"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s}
                    </span>
                  );
                },
              },
              {
                label: "Registration Date",
                key: "timestamp",
                render: (ts) => new Date(ts as string).toLocaleDateString(),
              },
            ]}
          />
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-4">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventSummaryPage;
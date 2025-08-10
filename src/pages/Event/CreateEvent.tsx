import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventService from "../../services/event.service";
import Button from "../../components/Button";
import {
  type CreateEventDTO,
  type EventProps,
} from "../../models/events/event.model";
import { showToast } from "../../utils/Toast";
import BackButton from "../../components/BackButton";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<CreateEventDTO>({
    title: "",
    description: "",
    date: "",
    maxAttendees: 0,
    image: "",
    location: {
      address: "",
      lat: 0,
      lng: 0,
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      try {
        const event: EventProps | null = await EventService.getEventById(id);
        if (event) {
          setForm({
            title: event.title,
            description: event.description,
            date: event.date.slice(0, 16),
            maxAttendees: event.maxAttendees,
            image: event.image,
           location: event.location ?? { address: "", lat: 0, lng: 0 },
          });
          if (typeof event.image === "string") {
            setPreview(event.image);
          }
        }
      } catch (err) {
        console.error("Failed to load event", err);
        showToast("error", "Failed to load event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let result: EventProps | null;

      const isImageFile = typeof form.image !== "string";

      let payload: FormData | CreateEventDTO;
      if (isImageFile) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("date", form.date);
        fd.append("maxAttendees", String(form.maxAttendees));
        fd.append("image", form.image as File);
        fd.append("location", JSON.stringify(form.location));

        payload = fd;
      } else {
        payload = {
          ...form,
          location: form.location,
        };
      }

      if (isEdit && id) {
        result = await EventService.updateEvent(id, payload);
      } else {
        result = await EventService.createEvent(payload);
      }

      if (result) {
        showToast(
          "success",
          `${result.title ?? "Event"} ${
            isEdit ? "updated" : "created"
          } successfully`
        );
        setTimeout(() => navigate("/events"), 1000);
      }
    } catch (err) {
      console.error("Failed to submit event", err);
      showToast("error", "Event submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackButton to="/events" className="mb-4" />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {" "}
            {isEdit ? "Update Event" : "Create New Event"}
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Event details"
                  rows={4}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  name="address"
                  value={form.location.address}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      location: { ...prev.location, address: e.target.value },
                    }))
                  }
                  placeholder="Enter event address"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="lat"
                    value={form.location.lat}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          lat: Number(e.target.value),
                        },
                      }))
                    }
                    step="any"
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="lng"
                    value={form.location.lng}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        location: {
                          ...prev.location,
                          lng: Number(e.target.value),
                        },
                      }))
                    }
                    step="any"
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Attendees
                </label>
                <input
                  type="number"
                  name="maxAttendees"
                  value={form.maxAttendees}
                  onChange={handleChange}
                  placeholder="Max number of participants"
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
           file:rounded-md file:border-0 file:text-sm file:font-semibold
           file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Event Preview"
                  className="rounded-md border max-h-64 w-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              variant="primary"
              className="w-auto px-6"
            >
              {isEdit ? "Update Event" : "Submit Event"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventPage;

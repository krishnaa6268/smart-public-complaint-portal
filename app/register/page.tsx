"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/context/ToastContext";
import { addComplaint } from "@/lib/complaints";
import { categories } from "@/utils/format";
import { AuthorityInfo } from "@/types/complaint";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CheckCircle2, Clipboard, UploadCloud } from "lucide-react";
import Link from "next/link";

const complaintSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  mobile: z.string().min(10, "Mobile number is required"),
  email: z.string().email("Provide a valid email"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(4, "Pincode is required"),
  title: z.string().min(5, "Complaint title is required"),
  description: z.string().min(15, "Please provide a detailed description"),
  category: z.enum(categories),
  image: z.any().optional(),
});

type ComplaintFormValues = z.infer<typeof complaintSchema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState, reset } =
    useForm<ComplaintFormValues>({
      resolver: zodResolver(complaintSchema),
      defaultValues: { category: "Water Issue" },
    });
  const { errors } = formState;
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<null | {
    reference: string;
    status: string;
    authority: AuthorityInfo;
  }>(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: ComplaintFormValues) => {
    setLoading(true);
    let imageUrl: string | undefined = undefined;

    if (data.image && data.image.length > 0) {
      const file = data.image[0];
      imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const complaint = addComplaint({
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      title: data.title,
      description: data.description,
      category: data.category,
      image: imageUrl,
    });

    setResult({
      reference: complaint.reference,
      status: complaint.status,
      authority: complaint.authority,
    });
    setLoading(false);
    reset({ category: data.category });
    setPreview(null);
    toast.addToast({
      title: "Complaint registered",
      description: "Your reference number is ready to track.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_40%,#f3f8ff_100%)] px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-950/90">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 dark:text-sky-300">
                File a complaint
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Register your complaint with the Smart Public Complaint Portal
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                Submit your issue and receive a reference number with status
                updates from the assigned authority.
              </p>
            </div>
            <Link
              href="/track"
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Track a complaint
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-950/90">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Jane Doe"
                    {...register("fullName")}
                  />
                  {errors.fullName ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.fullName.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Mobile Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 555 000 0000"
                    {...register("mobile")}
                  />
                  {errors.mobile ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.mobile.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Complaint Category
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
                    {...register("category")}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.category.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="123 Civic Drive"
                  {...register("address")}
                />
                {errors.address ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.address.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    City
                  </label>
                  <Input
                    type="text"
                    placeholder="Springfield"
                    {...register("city")}
                  />
                  {errors.city ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.city.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    State
                  </label>
                  <Input
                    type="text"
                    placeholder="California"
                    {...register("state")}
                  />
                  {errors.state ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.state.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Pincode
                  </label>
                  <Input
                    type="text"
                    placeholder="90210"
                    {...register("pincode")}
                  />
                  {errors.pincode ? (
                    <p className="mt-1 text-xs text-rose-600">
                      {errors.pincode.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Complaint Title
                </label>
                <Input
                  type="text"
                  placeholder="Broken streetlight on Elm Street"
                  {...register("title")}
                />
                {errors.title ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.title.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Complaint Description
                </label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  {...register("description")}
                />
                {errors.description ? (
                  <p className="mt-1 text-xs text-rose-600">
                    {errors.description.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Upload Image (optional)
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 transition hover:border-sky-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:bg-slate-950">
                  <UploadCloud className="h-5 w-5 text-sky-600" />
                  <span>
                    {preview ? "Change attachment" : "Choose a photo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      onChange: (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () =>
                          setPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      },
                    })}
                  />
                </label>
                {preview ? (
                  <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/80">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Preview
                    </p>
                    <img
                      src={preview}
                      alt="Upload preview"
                      className="mt-3 max-h-52 w-full rounded-3xl object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  All complaints are saved locally in your browser.
                </p>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Complaint"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-950/95 p-8 text-white shadow-xl shadow-slate-900/20 dark:border-slate-700 dark:bg-slate-950/95">
            <div className="rounded-[1.75rem] bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-300">
                Complaint guide
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                Make your complaint count.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Provide clear detail and attach a photo when possible. The
                system will assign authority and estimate the resolution window
                automatically.
              </p>
            </div>
            <div className="grid gap-4 rounded-[1.75rem] bg-slate-900/80 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-sky-400" />
                <div>
                  <p className="font-semibold">Instant reference ID</p>
                  <p className="text-sm text-slate-400">
                    Copy your complaint reference immediately after submission.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-sky-400" />
                <div>
                  <p className="font-semibold">Status transparency</p>
                  <p className="text-sm text-slate-400">
                    Track every status update from Submitted to Resolved.
                  </p>
                </div>
              </div>
            </div>

            {result ? (
              <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/95 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Registration complete
                </p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-3xl bg-slate-900/95 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-300">
                      Reference ID
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-lg font-semibold text-white">
                        {result.reference}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText(result.reference)
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                      >
                        <Clipboard size={14} /> Copy
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/95 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Current status
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {result.status}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-900/95 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Assigned authority
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {result.authority.name}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-slate-900/95 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Contact
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      {result.authority.phone}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      {result.authority.office}
                    </p>
                    <p className="mt-1 text-sm text-slate-300">
                      ETA: {result.authority.eta}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

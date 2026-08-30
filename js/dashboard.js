
import {
    supabase
} from "./supabase.js";

import {
    showToast,
    statusBadge,
    priorityBadge,
    initials,
    ticketId,
    escapeHTML,
    requireUser,
    setupMenu
} from "./utils.js";


// ======================================================
// GLOBAL VARIABLES
// ======================================================

let current = null;
let providers = [];
let bookings = [];

let selectedImage = null;
let selectedRating = 0;

const $ = (id) => document.getElementById(id);


// ======================================================
// INITIALIZE DASHBOARD
// ======================================================

async function init() {

    current = await requireUser(supabase, "customer");

    if (!current) return;

    setupMenu();

    $("userName").textContent = current.profile.full_name;

    $("avatar").textContent = initials(
        current.profile.full_name
    );

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "morning"
            : hour < 18
            ? "afternoon"
            : "evening";

    $("greeting").textContent =
        `Good ${greeting}, ${current.profile.full_name.split(" ")[0]} 👋`;

    // Minimum booking date = today
    $("bookingDate").min =
        new Date().toISOString().split("T")[0];

    await loadProviders();
    await loadBookings();
    await loadReviews();
}


// ======================================================
// LOAD PROVIDERS
// ======================================================

async function loadProviders() {

    const {
        data,
        error
    } = await supabase
        .from("providers")
        .select("*")
        .order("rating", {
            ascending: false
        });

    if (error) {

        console.error(error);

        showToast(
            "Could not load service providers."
        );

        return;
    }

    providers = data || [];
}


// ======================================================
// SERVICE CATEGORY CHANGE
// ======================================================

$("serviceCategory").onchange = () => {

    const category = $("serviceCategory").value;

    const filteredProviders =
        providers.filter(
            provider =>
                provider.service_category === category
        );

    $("providerSelect").disabled = !category;

    if (!category) {

        $("providerSelect").innerHTML =
            `<option value="">Select service first</option>`;

        return;
    }

    $("providerSelect").innerHTML =
        `<option value="">Choose a professional</option>` +

        filteredProviders
            .map(
                provider => `
                    <option value="${provider.id}">
                        ${escapeHTML(provider.name)}
                        • ${provider.experience} yrs
                        • ${provider.rating} ★
                        • PKR ${Number(provider.price).toLocaleString()}
                    </option>
                `
            )
            .join("");
};


// ======================================================
// IMAGE UPLOAD / PREVIEW
// ======================================================

const imageInput =
    document.getElementById("serviceImage");

const imagePreview =
    document.getElementById("imagePreview");

const previewImage =
    document.getElementById("previewImage");

const removeImage =
    document.getElementById("removeImage");


if (imageInput) {

    imageInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (!file) {

                selectedImage = null;

                imagePreview?.classList.add(
                    "d-none"
                );

                return;
            }

            // Maximum 5 MB
            if (
                file.size >
                5 * 1024 * 1024
            ) {

                showToast(
                    "Image must be smaller than 5MB."
                );

                imageInput.value = "";

                selectedImage = null;

                imagePreview?.classList.add(
                    "d-none"
                );

                return;
            }


            // Check image type
            if (!file.type.startsWith("image/")) {

                showToast(
                    "Please select a valid image file."
                );

                imageInput.value = "";

                selectedImage = null;

                imagePreview?.classList.add(
                    "d-none"
                );

                return;
            }


            selectedImage = file;


            // Show preview
            const reader =
                new FileReader();

            reader.onload =
                (event) => {

                    previewImage.src =
                        event.target.result;

                    imagePreview.classList.remove(
                        "d-none"
                    );
                };

            reader.readAsDataURL(file);
        }
    );
}


// ======================================================
// REMOVE IMAGE
// ======================================================

if (removeImage) {

    removeImage.addEventListener(
        "click",
        () => {

            selectedImage = null;

            imageInput.value = "";

            previewImage.src = "";

            imagePreview.classList.add(
                "d-none"
            );
        }
    );
}


// ======================================================
// CREATE BOOKING
// ======================================================

$("bookingForm").onsubmit =
    async (event) => {

        event.preventDefault();


        // Validate form
        if (
            !$("bookingForm").checkValidity()
        ) {

            showToast(
                "Please complete all required fields."
            );

            return;
        }


        // Find selected provider
        const provider =
            providers.find(
                p =>
                    p.id ==
                    $("providerSelect").value
            );


        if (!provider) {

            showToast(
                "Please select a provider."
            );

            return;
        }


        // Generate unique ticket
        const ticket =
            ticketId();


        // ==========================================
        // IMAGE UPLOAD
        // ==========================================

        let imageUrl = null;


        if (selectedImage) {

            const extension =
                selectedImage.name
                    .split(".")
                    .pop()
                    .toLowerCase();


            const filePath =
                `${current.user.id}/${ticket}.${extension}`;


            const {
                error: uploadError
            } =
                await supabase.storage
                    .from("service_images")
                    .upload(
                        filePath,
                        selectedImage,
                        {
                            cacheControl: "3600",
                            upsert: false,
                            contentType:
                                selectedImage.type
                        }
                    );


            if (uploadError) {

                console.error(
                    "Image upload error:",
                    uploadError
                );

                showToast(
                    "Image upload failed."
                );

                return;
            }


            // Get public URL
            const {
                data: publicUrlData
            } =
                supabase.storage
                    .from("service_images")
                    .getPublicUrl(
                        filePath
                    );


            imageUrl =
                publicUrlData.publicUrl;
        }


        // ==========================================
        // INSERT BOOKING
        // ==========================================

        const {
            data,
            error
        } =
            await supabase
                .from("bookings")
                .insert({

                    ticket_id: ticket,

                    customer_id:
                        current.user.id,

                    provider_id:
                        provider.id,

                    service_category:
                        $("serviceCategory").value,

                    date:
                        $("bookingDate").value,

                    time:
                        $("bookingTime").value,

                    location:
                        $("location").value.trim(),

                    description:
                        $("description").value.trim(),

                    priority:
                        $("priority").value,

                    status:
                        "pending",

                    image_url:
                        imageUrl

                })
                .select()
                .single();


        if (error) {

            console.error(
                "Booking error:",
                error
            );

            showToast(
                "Could not create service request."
            );

            return;
        }


        // ==========================================
        // SUCCESS MODAL
        // ==========================================

        $("modalTicket").textContent =
            ticket;


        $("modalDetails").innerHTML = `

            <div>
                <strong>Provider:</strong>
                ${escapeHTML(provider.name)}
            </div>

            <div>
                <strong>Service:</strong>
                ${escapeHTML(provider.service_category)}
            </div>

            <div>
                <strong>Priority:</strong>
                ${escapeHTML(data.priority)}
            </div>

            <div>
                <strong>Date:</strong>
                ${data.date}
                at
                ${data.time}
            </div>

            ${
                imageUrl
                    ? `
                        <div class="mt-2">
                            <strong>Photo:</strong>
                            Attached ✓
                        </div>
                    `
                    : ""
            }

        `;


        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    "ticketModal"
                )
            );

        modal.show();


        // ==========================================
        // RESET FORM
        // ==========================================

        $("bookingForm").reset();

        $("providerSelect").disabled = true;

        $("providerSelect").innerHTML =
            `<option value="">
                Select service first
            </option>`;


        // Reset image
        selectedImage = null;

        if (imageInput) {
            imageInput.value = "";
        }

        if (previewImage) {
            previewImage.src = "";
        }

        if (imagePreview) {
            imagePreview.classList.add(
                "d-none"
            );
        }


        await loadBookings();

    };


// ======================================================
// LOAD CUSTOMER BOOKINGS
// ======================================================

async function loadBookings() {

    const {
        data,
        error
    } =
        await supabase
            .from("bookings")
            .select(
                "*, providers(name,location,rating)"
            )
            .eq(
                "customer_id",
                current.user.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        showToast(
            "Could not load your requests."
        );

        return;
    }


    bookings = data || [];


    // Statistics
    $("totalCount").textContent =
        bookings.length;

    $("pendingCount").textContent =
        bookings.filter(
            b => b.status === "pending"
        ).length;

    $("progressCount").textContent =
        bookings.filter(
            b =>
                b.status === "in_progress"
        ).length;

    $("completedCount").textContent =
        bookings.filter(
            b =>
                b.status === "completed"
        ).length;


    renderBookings();
}


// ======================================================
// RENDER BOOKINGS
// ======================================================

function renderBookings() {

    if (!bookings.length) {

        $("requestsList").innerHTML = `
            <div class="request-card text-center py-5">

                <h5>No requests yet</h5>

                <p class="muted">
                    Your first service request
                    will appear here.
                </p>

            </div>
        `;

        return;
    }


    $("requestsList").innerHTML =
        bookings
            .map(
                booking => {

                    const steps = [
                        "submitted",
                        "accepted",
                        "in_progress",
                        "completed"
                    ];


                    const indexMap = {
                        pending: 0,
                        accepted: 1,
                        in_progress: 2,
                        completed: 3,
                        rejected: -1
                    };


                    const currentIndex =
                        indexMap[
                            booking.status
                        ];


                    return `

                    <article class="request-card">

                        <div class="request-head">

                            <div>

                                <h5>
                                    ${escapeHTML(
                                        booking.ticket_id
                                    )}
                                </h5>

                                <span class="muted">

                                    ${escapeHTML(
                                        booking.service_category
                                    )}

                                    •

                                    ${escapeHTML(
                                        booking.providers?.name ||
                                        "Provider"
                                    )}

                                </span>

                            </div>


                            <div class="d-flex gap-2 flex-wrap">

                                ${priorityBadge(
                                    booking.priority
                                )}

                                ${statusBadge(
                                    booking.status
                                )}

                            </div>

                        </div>


                        <div class="request-info">

                            <div>

                                <strong>
                                    Location
                                </strong>

                                ${escapeHTML(
                                    booking.location
                                )}

                            </div>


                            <div>

                                <strong>
                                    Date
                                </strong>

                                ${booking.date}

                            </div>


                            <div>

                                <strong>
                                    Time
                                </strong>

                                ${booking.time}

                            </div>


                            <div>

                                <strong>
                                    Provider
                                </strong>

                                ${escapeHTML(
                                    booking.providers?.name ||
                                    "—"
                                )}

                            </div>

                        </div>


                        <p class="small mb-2">

                            ${escapeHTML(
                                booking.description
                            )}

                        </p>


                        ${
                            booking.image_url
                                ? `

                                <div class="mt-3">

                                    <strong class="small d-block mb-2">
                                        📷 Attached photo
                                    </strong>

                                    <a
                                        href="${booking.image_url}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >

                                        <img
                                            src="${booking.image_url}"
                                            alt="Service problem"
                                            style="
                                                width:180px;
                                                height:120px;
                                                object-fit:cover;
                                                border-radius:14px;
                                                border:1px solid #e2e8f0;
                                            "
                                        >

                                    </a>

                                </div>

                            `
                                : ""
                        }


                        ${
                            booking.status !==
                            "rejected"

                                ? `

                                    <div class="timeline">

                                        ${steps
                                            .map(
                                                (
                                                    step,
                                                    index
                                                ) => `

                                                <div
                                                    class="
                                                        timeline-step
                                                        ${
                                                            index <=
                                                            currentIndex
                                                                ? "done"
                                                                : ""
                                                        }

                                                        ${
                                                            index ===
                                                            currentIndex
                                                                ? "current"
                                                                : ""
                                                        }
                                                    "
                                                >

                                                    ${
                                                        index ===
                                                        0
                                                            ? "Submitted"
                                                            : step
                                                                .replace(
                                                                    "_",
                                                                    " "
                                                                )
                                                                .replace(
                                                                    /\b\w/g,
                                                                    m =>
                                                                        m.toUpperCase()
                                                                )
                                                    }

                                                </div>

                                            `
                                            )
                                            .join("")}

                                    </div>

                                `
                                : ""
                        }


                        ${
                            booking.status ===
                                "completed" &&
                            !booking.reviewed

                                ? `

                                    <button
                                        class="
                                            btn
                                            btn-primary
                                            btn-sm
                                            rounded-3
                                            review-btn
                                        "
                                        data-id="${booking.id}"
                                    >

                                        ★ Leave a Review

                                    </button>

                                `
                                : ""
                        }


                        ${
                            booking.status ===
                                "completed" &&
                            booking.reviewed

                                ? `

                                    <span
                                        class="
                                            small
                                            text-success
                                            fw-semibold
                                        "
                                    >

                                        ✓ Review submitted

                                    </span>

                                `
                                : ""
                        }

                    </article>

                    `;
                }
            )
            .join("");


    // Review button handlers
    document
        .querySelectorAll(".review-btn")
        .forEach(
            button => {

                button.onclick =
                    () =>
                        openReview(
                            button.dataset.id
                        );

            }
        );
}


// ======================================================
// LOAD REVIEWS
// ======================================================

async function loadReviews() {

    const {
        data,
        error
    } =
        await supabase
            .from("reviews")
            .select(
                "*, providers(name)"
            )
            .eq(
                "customer_id",
                current.user.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        return;
    }


    $("reviewsList").innerHTML =
        data?.length

            ? data
                .map(
                    review => `

                    <div class="review-box">

                        <div
                            class="
                                d-flex
                                justify-content-between
                            "
                        >

                            <strong>
                                ${escapeHTML(
                                    review.providers?.name ||
                                    "Provider"
                                )}
                            </strong>

                            <span class="review-stars">

                                ${"★".repeat(
                                    review.rating
                                )}

                                ${"☆".repeat(
                                    5 -
                                    review.rating
                                )}

                            </span>

                        </div>


                        <p class="small muted mb-0 mt-2">

                            ${escapeHTML(
                                review.review_text
                            )}

                        </p>

                    </div>

                `
                )
                .join("")

            : `

                <div class="review-box muted small">

                    Completed-service reviews
                    will appear here.

                </div>

            `;
}


// ======================================================
// OPEN REVIEW MODAL
// ======================================================

function openReview(id) {

    selectedRating = 0;

    $("reviewBookingId").value = id;

    document
        .querySelectorAll(
            "#starPicker button"
        )
        .forEach(
            button =>
                button.classList.remove(
                    "selected"
                )
        );


    new bootstrap.Modal(
        document.getElementById(
            "reviewModal"
        )
    ).show();
}


// ======================================================
// STAR RATING
// ======================================================

document
    .querySelectorAll(
        "#starPicker button"
    )
    .forEach(
        button => {

            button.onclick =
                () => {

                    selectedRating =
                        Number(
                            button.dataset.star
                        );


                    document
                        .querySelectorAll(
                            "#starPicker button"
                        )
                        .forEach(
                            star => {

                                star.classList.toggle(
                                    "selected",
                                    Number(
                                        star.dataset.star
                                    ) <=
                                    selectedRating
                                );

                            }
                        );
                };
        }
    );


// ======================================================
// SUBMIT REVIEW
// ======================================================

$("reviewForm").onsubmit =
    async (event) => {

        event.preventDefault();


        if (!selectedRating) {

            showToast(
                "Please choose a star rating."
            );

            return;
        }


        const bookingId =
            $("reviewBookingId").value;


        // Get booking
        const {
            data: booking,
            error: bookingError
        } =
            await supabase
                .from("bookings")
                .select("*")
                .eq("id", bookingId)
                .eq(
                    "customer_id",
                    current.user.id
                )
                .single();


        if (
            bookingError ||
            !booking
        ) {

            showToast(
                "Booking not found."
            );

            return;
        }


        // Must be completed
        if (
            booking.status !==
            "completed"
        ) {

            showToast(
                "Only completed bookings can be reviewed."
            );

            return;
        }


        // Prevent duplicate review
        const {
            data: existingReview
        } =
            await supabase
                .from("reviews")
                .select("id")
                .eq(
                    "booking_id",
                    bookingId
                )
                .maybeSingle();


        if (existingReview) {

            showToast(
                "This booking has already been reviewed."
            );

            return;
        }


        // Insert review
        const {
            error
        } =
            await supabase
                .from("reviews")
                .insert({

                    booking_id:
                        bookingId,

                    customer_id:
                        current.user.id,

                    provider_id:
                        booking.provider_id,

                    rating:
                        selectedRating,

                    review_text:
                        $("reviewText")
                            .value
                            .trim()

                });


        if (error) {

            console.error(error);

            showToast(
                "Could not submit review."
            );

            return;
        }


        // Mark booking as reviewed
        await supabase
            .from("bookings")
            .update({
                reviewed: true
            })
            .eq(
                "id",
                bookingId
            );


        // Close modal
        bootstrap.Modal
            .getInstance(
                document.getElementById(
                    "reviewModal"
                )
            )
            .hide();


        $("reviewForm").reset();

        showToast(
            "Review submitted — thank you!"
        );


        await loadBookings();
        await loadReviews();
    };


// ======================================================
// REFRESH
// ======================================================

$("refreshBtn").onclick =
    () =>
        loadBookings();


// ======================================================
// LOGOUT
// ======================================================

$("logoutBtn").onclick =
    async () => {

        await supabase.auth.signOut();

        location.href =
            "index.html";
    };


// ======================================================
// START
// ======================================================

init();





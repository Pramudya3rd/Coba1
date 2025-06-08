// src/components/Detail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaUserFriends,
} from "react-icons/fa";
import api from "../api/axios";

// Get the base URL for static assets from the environment variable
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State baru untuk gambar utama yang sedang ditampilkan
  const [currentMainImageSrc, setCurrentMainImageSrc] = useState("");

  const villaId = location.state?.id;

  useEffect(() => {
    console.log(
      "Detail.jsx: Component loaded. Received villaId from state:",
      villaId
    );

    if (!villaId) {
      console.error("Detail.jsx Error: villaId is undefined or null.");
      setError(
        "ID Villa tidak ditemukan. Mengarahkan kembali ke halaman villa..."
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/our-villa"); // Atau halaman daftar villa yang sesuai
      }, 2000);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        console.log(
          `Detail.jsx: Attempting to fetch villa details for ID: ${villaId}`
        );
        const response = await api.get(`/villas/${villaId}`);
        const fetchedVilla = response.data.data; // Simpan data villa yang diambil
        console.log(
          "Detail.jsx: Successfully fetched villa data:",
          fetchedVilla
        );

        // --- DEBUG LOG: Periksa tipe dan isi additionalImages dan features dari backend ---
        console.log(
          "Detail.jsx: Raw additionalImages from backend:",
          fetchedVilla.additionalImages,
          "Type:",
          typeof fetchedVilla.additionalImages
        );
        console.log(
          "Detail.jsx: Raw features from backend:",
          fetchedVilla.features,
          "Type:",
          typeof fetchedVilla.features
        );
        // --- END DEBUG LOG ---

        setVilla(fetchedVilla);
        // Set gambar utama awal setelah data villa diambil
        if (fetchedVilla.mainImage) {
          setCurrentMainImageSrc(`${backendBaseUrl}${fetchedVilla.mainImage}`);
        } else if (
          fetchedVilla.additionalImages &&
          fetchedVilla.additionalImages.length > 0
        ) {
          // Jika tidak ada mainImage, gunakan gambar tambahan pertama sebagai default
          const ensuredAdditionalImages = Array.isArray(
            fetchedVilla.additionalImages
          )
            ? fetchedVilla.additionalImages
            : typeof fetchedVilla.additionalImages === "string" &&
              fetchedVilla.additionalImages.trim() !== ""
            ? JSON.parse(fetchedVilla.additionalImages)
            : [];
          if (ensuredAdditionalImages.length > 0) {
            setCurrentMainImageSrc(
              `${backendBaseUrl}${ensuredAdditionalImages[0]}`
            );
          }
        }
      } catch (err) {
        console.error(
          "Detail.jsx Error fetching villa details:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message ||
            "Gagal memuat detail villa. Pastikan ID villa valid dan server berjalan."
        );
        setTimeout(() => {
          navigate("/our-villa"); // Atau halaman daftar villa yang sesuai
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchVillaDetails();
  }, [villaId, navigate]);

  // Fungsi untuk mengganti gambar utama saat thumbnail diklik
  const handleThumbnailClick = (imageSrc) => {
    setCurrentMainImageSrc(imageSrc);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat detail villa...</span>
        </div>
        <p className="ms-3">Memuat detail villa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  if (!villa) {
    return <div className="text-center my-5">Detail villa tidak tersedia.</div>;
  }

  const handleBooking = () => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (!token) {
      // Jika tidak ada token, berarti user belum login
      alert("Anda harus login untuk melakukan pemesanan."); // Beri tahu user
      navigate("/login"); // Arahkan ke halaman login
    } else {
      // Jika sudah login, lanjutkan ke halaman booking
      console.log(
        "Detail.jsx: 'Book Now' button clicked, navigating to /booking."
      );
      navigate("/booking", {
        state: {
          villaId: villa.id,
          title: villa.name,
          pricePerNight: villa.pricePerNight,
          mainImage: villa.mainImage,
        },
      });
    }
  };

  const {
    name,
    location: villaLocation,
    pricePerNight,
    mainImage,
    description,
    features,
    guestCapacity,
    size,
    bedType,
    additionalImages,
  } = villa;

  // --- PERBAIKAN: Pastikan additionalImages dan features selalu array ---
  const ensuredAdditionalImages = Array.isArray(additionalImages)
    ? additionalImages
    : typeof additionalImages === "string" && additionalImages.trim() !== ""
    ? JSON.parse(additionalImages)
    : [];

  const ensuredFeatures = Array.isArray(features)
    ? features
    : typeof features === "string" && features.trim() !== ""
    ? JSON.parse(features)
    : [];
  // --- AKHIR PERBAIKAN ---

  // Gabungkan mainImage dan additionalImages untuk thumbnail
  const allImagesForThumbnails = [];
  if (mainImage) {
    allImagesForThumbnails.push(mainImage);
  }
  allImagesForThumbnails.push(...ensuredAdditionalImages);

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <img
            src={currentMainImageSrc} // Menggunakan state untuk gambar utama
            alt={name}
            className="img-fluid rounded-4 mb-3"
            style={{ height: "400px", objectFit: "cover", width: "100%" }} // Menambahkan gaya untuk ukuran tetap
          />
          <div className="row g-3">
            {allImagesForThumbnails.map(
              (
                img,
                i // Iterasi semua gambar untuk thumbnail
              ) => (
                <div className="col-4" key={i}>
                  <img
                    src={`${backendBaseUrl}${img}`} // Prepend base URL
                    alt={`thumbnail-${i}`}
                    className="img-fluid img-thumbnail rounded-4"
                    style={{
                      height: "80px",
                      objectFit: "cover",
                      width: "100%",
                      cursor: "pointer",
                    }} // Tambahkan cursor pointer
                    onClick={() =>
                      handleThumbnailClick(`${backendBaseUrl}${img}`)
                    } // Tambahkan onClick handler
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="col-md-6">
          <h3 className="fw-bold">{name}</h3>
          <p className="mb-2">
            <span className="text-warning">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="ms-2">
              4.9 <span className="text-muted">(20 Reviews)</span>
            </span>
          </p>
          <h5 className="fw-bold text-dark mb-3">
            Rp. {parseFloat(pricePerNight).toLocaleString("id-ID")}{" "}
            <span className="fw-normal text-muted">/ night</span>
          </h5>
          <p className="text-muted">{description}</p>

          <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
          <div className="row row-cols-2 mb-3 text-muted">
            {ensuredFeatures.map(
              (
                feature,
                i // Gunakan ensuredFeatures
              ) => (
                <div className="col mb-2" key={i}>
                  {feature}
                </div>
              )
            )}
            <div className="col mb-2">
              <FaUserFriends className="me-2" />
              Max Guests: <strong>{guestCapacity}</strong>
            </div>
            <div className="col mb-2">
              <FaRulerCombined className="me-2" />
              Size: <strong>{size}</strong>
            </div>
            <div className="col mb-2">
              <FaBed className="me-2" />
              Bed Type: <strong>{bedType}</strong>
            </div>
          </div>

          <h6 className="fw-bold mt-4 mb-2">Children and Extra Beds</h6>
          <p className="text-muted mb-4">
            Children are welcome to stay. Extra beds are available upon request
            and may incur additional charges.
          </p>

          <button
            className="btn rounded-pill text-white w-100 py-2"
            style={{ backgroundColor: "#5a7684" }}
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;

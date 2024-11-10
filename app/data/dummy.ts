import Loker from "../assets/loker.png";
import Mentoring from "../assets/mentoring.png";
import Magang from "../assets/magang.png";
import Kursus from "../assets/kursus.png";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
export const dataFeature = [
    {
      title: "Loker",
      img: Loker,
      description: "Cari pekerjaan dengan mudah!",
      slot: 130,
    },
    {
      title: "Mentoring",
      img: Mentoring,
      description: "Mentor terpercaya tersedia buat kamu!",
      slot: 60,
    },
    {
      title: "Magang",
      img: Magang,
      description: "Yuk tambah pengalaman kamu dengan magang!",
      slot: 45,
    },
    {
      title: "Kursus",
      img: Kursus,
      description: "Banyak ilmu yang bisa kamu dapat disini!",
      route:"/course",
      slot: 56,
    },
  ];
  
  export const dummyCourse = [
    {
      id: 1,
      name: "Data Analysis with Python",
      price: 150000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 8,
    },
    {
      id: 2,
      name: "Introduction to Machine Learning",
      price: 200000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 10,
    },
    {
      id: 3,
      name: "Web Development with React",
      price: 180000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 12,
    },
    {
      id: 4,
      name: "JavaScript Fundamentals",
      price: 120000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 6,
    },
    {
      id: 5,
      name: "Advanced CSS Techniques",
      price: 130000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 8,
    },
    {
      id: 6,
      name: "Backend Development with Node.js",
      price: 220000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 15,
    },
    {
      id: 7,
      name: "UI/UX Design Essentials",
      price: 160000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 7,
    },
    {
      id: 8,
      name: "Python for Data Science",
      price: 170000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 10,
    },
    {
      id: 9,
      name: "Database Management with SQL",
      price: 140000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 9,
    },
    {
      id: 10,
      name: "Digital Marketing Basics",
      price: 110000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 5,
    },
    {
      id: 11,
      name: "Cloud Computing with AWS",
      price: 250000,
      img: "https://random-image-pepebigotes.vercel.app/api/random-image",
      pertemuan: 12,
    },
  ];
  
  export const testimonial = [
    {
      name: "Park Jeongwoo",
      content:
        "Kursus yang ada pada aplikasi ini sangat membantu saya. Sebelumnya saya bingung mencari kursus yang tepat apalagi spesifik tentang data analis.",
      role: "Kursus Data Analysis",
      img :"xsgames.co/randomusers/avatar.php?g=male"
    },
    {
        name: "Kim Jisoo",
        content:
        "Materi yang disediakan sangat mudah dipahami dan sangat membantu meningkatkan keterampilan saya dalam desain grafis.",
        role: "Kursus Desain Grafis",
        img :"xsgames.co/randomusers/avatar.php?g=female"
    },
    {
        name: "Lee Minho",
        content:
        "Instruktur sangat interaktif dan materi disampaikan dengan jelas. Saya merasa lebih siap untuk menghadapi dunia kerja di bidang IT.",
        role: "Kursus Pengembangan Web",
        img :"xsgames.co/randomusers/avatar.php?g=male"
    },
    {
        name: "Siti Nurhaliza",
        content:
        "Pengalaman belajar yang sangat berkesan. Semua materi dijelaskan dengan praktis dan mudah dipahami, bahkan untuk pemula seperti saya.",
        role: "Kursus Dasar-Dasar Pemrograman",
        img :"xsgames.co/randomusers/avatar.php?g=female"
    },
    {
        name: "John Doe",
        content:
        "Saya sangat merekomendasikan kursus ini. Materinya lengkap dan penjelasannya sangat detail, sehingga memudahkan saya belajar machine learning.",
        role: "Kursus Machine Learning",
        img :"xsgames.co/randomusers/avatar.php?g=male"
    },
    {
      name: "Rina Susanti",
      content:
        "Sangat senang bisa belajar dengan platform ini. Kursusnya lengkap, praktis, dan langsung bisa dipraktikkan di pekerjaan saya.",
      role: "Kursus Manajemen Proyek",
      img:"xsgames.co/randomusers/avatar.php?g=female"
    },
    {
      name: "David Kim",
      content:
        "Ini adalah pengalaman belajar online terbaik yang pernah saya coba. Materi tentang pemrograman Python sangat lengkap dan mudah dimengerti.",
      role: "Kursus Pemrograman Python",
      img:'xsgames.co/randomusers/avatar.php?g=male'
    },
  ];


  export const dummyClass =[
    {
      "title": "Pengenalan Python untuk Analisis Data",
      "duration": "15 mnt",
      img : `${img1}`
    },
    {
      "title": "Manipulasi Data dengan Pandas",
      "duration": "50 mnt",
      img : `${img2}`
    },
    {
      "title": "Visualisasi Data Dasar dengan Matplotlib",
      "duration": "50 mnt",
      img : `${img3}`
    },
    {
      "title": "Visualisasi Data Lanjutan dengan Seaborn",
      "duration": "50 mnt",
      img : `${img1}`
    },
    {
      "title": "Analisis Data Eksploratif (Exploratory Data Analysis - EDA)",
      "duration": "50 mnt",
      img : `${img2}`
    },
    {
      "title": "Pengenalan Statistik untuk Analisis Data",
      "duration": "50 mnt",
      img : `${img3}`
    }
  ]
  
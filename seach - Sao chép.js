let currentIndex = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.querySelector('.dots-container');
// Hàm chuyển slide
function showSlide(index) {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// Điều hướng next/prev
function showNextSlide() {
    showSlide(currentIndex + 1);
}

function showPrevSlide() {
    showSlide(currentIndex - 1);
}

// Sự kiện cho nút bấm
nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);

// Sự kiện cho dots
function addDotListeners() {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
}

// Tự động chuyển slide
setInterval(showNextSlide, 3000);

// Hàm lấy giá trị tham số từ URL
function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Lấy từ khóa từ URL
let keyword = getQueryParam('q');
let searchExternal = getQueryParam('external') === 'true'; // Chuyển thành boolean

document.getElementById('searchInput').value = keyword; // Hiển thị từ khóa trong ô tìm kiếm

if (searchExternal) {
    // Nếu tìm kiếm ngoài, điều hướng đến NhacCuaTui
    window.location.href = `https://www.nhaccuatui.com/tim-kiem?q=${encodeURIComponent(keyword)}`;
} else {
    // Nếu tìm kiếm trong trang, thực hiện tìm kiếm nội bộ
    searchLocal(keyword);
}

// Hàm tìm kiếm trong trang của bạn
function searchLocal(keyword) {
    let items = document.querySelectorAll('.song-title');
    let found = false;

    items.forEach(item => {
        let parentCard = item.closest('.song-item');
        if (item.innerText.toLowerCase().includes(keyword.toLowerCase())) {
            parentCard.style.display = "block";
            parentCard.classList.add("shrink");
            found = true;
        } else {
            parentCard.style.display = "none";
            parentCard.classList.remove("shrink");
        }
    });

    if (!found) {
        alert("Không tìm thấy bài hát nào!");
    }
}
document.getElementById('searchBtn').addEventListener('click', function () {
    let keyword = document.getElementById('searchInput').value.trim();
    let searchExternal = document.getElementById('searchExternal').checked; // Kiểm tra checkbox có được chọn không

    if (keyword === "") {
        alert("Vui lòng nhập từ khóa!");
        return;
    }

    if (searchExternal) {
        // Tìm kiếm trên NhacCuaTui
        window.location.href = `https://www.nhaccuatui.com/tim-kiem?q=${encodeURIComponent(keyword)}`;
    } else {
        // Tìm kiếm trong trang
        searchLocal(keyword);
    }
});

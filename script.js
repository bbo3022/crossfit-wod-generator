const exercises = {
    "역도": ["클린 앤 저크", "스내치", "데드리프트", "백 스쿼트", "프론트 스쿼트", "오버헤드 스쿼트", "파워 클린", "파워 스내치", "행 클린", "행 스내치", "푸시 프레스", "숄더 프레스", "스플릿 저크", "스러스터", "클린 풀", "스내치 풀"],
    "체조": ["풀업", "체스트 투 바 풀업", "푸시업", "머슬업", "핸드스탠드 푸시업", "토 투 바", "니 투 엘보우", "L-sit", "피스톨 스쿼트", "버피", "점프 스쿼트", "점프 런지"],
    "유산소": ["로잉", "더블 언더", "에어 바이크", "스키 에르고미터"],
    "케틀벨": ["케틀벨 스윙", "케틀벨 클린", "케틀벨 스내치", "케틀벨 고블릿 스쿼트"],
    "박스,월볼": ["박스 점프", "박스 점프 오버", "월볼 샷","월볼 클린", "메디신볼 슬램", "메디신볼 클린"],
    "기능성": ["파머스 캐리", "샌드백 캐리"],
    "코어": ["플랭크", "사이드 플랭크", "싯업", "V-up"],
    "올림픽 역도 변형": ["덤벨 클린 앤 저크", "덤벨 스내치", "싱글 암 덤벨 스내치","맨메이커", "데빌 프레스"]
};

let selectedCategories = [];

document.getElementById('categorySelect').addEventListener('change', function() {
    const category = this.value;
    if (category && !selectedCategories.includes(category)) {
        selectedCategories.push(category);
        updateSelectedCategories();
    }
    this.selectedIndex = 0;
});

function updateSelectedCategories() {
    const container = document.getElementById('selectedCategories');
    container.innerHTML = '';
    selectedCategories.forEach((category, index) => {
        const span = document.createElement('span');
        span.textContent = category;
        span.className = 'category-tag';
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.onclick = () => removeCategory(index);
        span.appendChild(removeButton);
        container.appendChild(span);
    });
}

function removeCategory(index) {
    selectedCategories.splice(index, 1);
    updateSelectedCategories();
}

function generateWOD() {
    const workoutType = document.getElementById('workoutType').value;
    const time = parseInt(document.getElementById('time').value);
    const rounds = parseInt(document.getElementById('rounds').value) || null;

    if (selectedCategories.length === 0) {
        alert("최소한 하나의 운동 카테고리를 선택해주세요.");
        return;
    }

    if (!time) {
        alert("운동 시간을 입력해주세요.");
        return;
    }

    let workout = `${workoutType} `;
    if (rounds) {
        workout += `${rounds} Rounds `;
    }
    workout += `for ${time} minutes\n\n`;

    if (workoutType === "EMOM") {
        workout += `Every minute for ${time} minutes:\n`;
    } else if (workoutType === "타바타") {
        workout += "8 라운드, 각 운동 20초 수행, 10초 휴식\n";
    }

    selectedCategories.forEach(category => {
        const exercise = exercises[category][Math.floor(Math.random() * exercises[category].length)];
        if (workoutType === "For Time" || workoutType === "AMRAP") {
            const reps = Math.floor(Math.random() * 16) + 5; // 5-20 reps
            workout += `- ${reps} ${exercise}\n`;
        } else {
            workout += `- ${exercise}\n`;
        }
    });

    document.getElementById('result').textContent = workout;
}

// Service Worker 등록
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('ServiceWorker registered'))
        .catch(error => console.log('ServiceWorker registration failed: ', error));
}
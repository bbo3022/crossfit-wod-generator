const exercises = {
    "역도": ["클린 앤 저크", "스내치", "데드리프트", "백 스쿼트", "프론트 스쿼트", "오버헤드 스쿼트", "파워 클린", "파워 스내치", "행 클린", "행 스내치", "푸시 프레스", "숄더 프레스", "스플릿 저크", "스러스터", "클린 풀", "스내치 풀"],
    "체조": ["풀업", "체스트 투 바 풀업", "푸시업", "머슬업", "핸드스탠드 푸시업", "토 투 바", "니 투 엘보우", "L-sit", "피스톨 스쿼트", "버피", "점프 스쿼트", "점프 런지"],
    "유산소": ["로잉", "더블 언더", "에어 바이크", "스키 에르고미터"],
    "케틀벨": ["케틀벨 스윙", "케틀벨 클린", "케틀벨 스내치", "케틀벨 고블릿 스쿼트"],
    "박스,월볼": ["박스 점프", "박스 점프 오버", "월볼 샷","월볼 클린", "메디신볼 슬램", "메디신볼 클린"],
    "기능성": ["파머스 캐리", "샌드백 캐리"],
    "코어": ["플랭크", "사이드 플랭크", "싯업", "V-up"],
    "올림픽 역도 변형": ["덤벨 클린 앤 저크", "덤벨 스내치", "싱글 암 덤벨 스내치","맨메이커", "데빌 프레스"],
    "네임드 와드": ["Fran", "Cindy", "Murph", "Annie", "Grace", "Helen", "Jackie", "Karen", "Diane", "Elizabeth"]
};

const namedWODs = {
    "Fran": [
        { name: "스러스터", reps: "21-15-9" },
        { name: "풀업", reps: "21-15-9" }
    ],
    "Cindy": [
        { name: "풀업", reps: "5" },
        { name: "푸시업", reps: "10" },
        { name: "에어 스쿼트", reps: "15" }
    ],
    "Murph": [
        { name: "1마일 런", reps: "1" },
        { name: "풀업", reps: "100" },
        { name: "푸시업", reps: "200" },
        { name: "에어 스쿼트", reps: "300" },
        { name: "1마일 런", reps: "1" }
    ],
    "Annie": [
        { name: "더블 언더", reps: "50-40-30-20-10" },
        { name: "싯업", reps: "50-40-30-20-10" }
    ],
    "Grace": [
        { name: "클린 앤 저크", reps: "30" }
    ],
    "Helen": [
        { name: "400m 런", reps: "3" },
        { name: "케틀벨 스윙", reps: "21" },
        { name: "풀업", reps: "12" }
    ],
    "Jackie": [
        { name: "1000m 로우", reps: "1" },
        { name: "트러스터 50lb", reps: "50" },
        { name: "풀업", reps: "30" }
    ],
    "Karen": [
        { name: "월볼 샷", reps: "150" }
    ],
    "Diane": [
        { name: "데드리프트", reps: "21-15-9" },
        { name: "핸드스탠드 푸시업", reps: "21-15-9" }
    ],
    "Elizabeth": [
        { name: "클린", reps: "21-15-9" },
        { name: "링 딥", reps: "21-15-9" }
    ]
};

let selectedExercises = [];

// 사용자 프로필 (실제로는 사용자 입력이나 저장된 데이터에서 가져와야 함)
const userProfile = {
    fitnessLevel: 'intermediate', // 'beginner', 'intermediate', 'advanced'
    preferredExerciseTypes: ['체조', '유산소'] // 사용자가 선호하는 운동 유형
};

// 피트니스 레벨에 따른 운동 강도 조정
const intensityMultiplier = {
    beginner: 0.7,
    intermediate: 1,
    advanced: 1.3
};

function showExercises() {
    const category = document.getElementById('categorySelect').value;
    const exerciseList = document.getElementById('exerciseList');
    exerciseList.innerHTML = '';
    if (category) {
        exercises[category].forEach(exercise => {
            const button = document.createElement('button');
            button.textContent = exercise;
            button.onclick = () => category === "네임드 와드" ? addNamedWOD(exercise) : addExercise(exercise);
            exerciseList.appendChild(button);
        });
    }
}

function addNamedWOD(wodName) {
    selectedExercises = namedWODs[wodName];
    displaySelectedExercises();
}

function addExercise(exercise) {
    if (!selectedExercises.some(e => e.name === exercise)) {
        selectedExercises.push({ name: exercise, reps: '' });
        displaySelectedExercises();
    }
}

function displaySelectedExercises() {
    const container = document.getElementById('selectedExercises');
    container.innerHTML = '<h3>선택된 운동:</h3>';
    selectedExercises.forEach((exercise, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <span>${exercise.name}</span>
            <input type="text" value="${exercise.reps}" placeholder="횟수" 
                onchange="updateReps(${index}, this.value)">
            <button onclick="removeExercise(${index})">X</button>
        `;
        container.appendChild(div);
    });
}

function updateReps(index, reps) {
    selectedExercises[index].reps = reps;
}

function removeExercise(index) {
    selectedExercises.splice(index, 1);
    displaySelectedExercises();
}

function toggleRoundsInput() {
    const workoutType = document.getElementById('workoutType').value;
    const roundsInput = document.getElementById('rounds');
    if (workoutType === 'AMRAP') {
        roundsInput.style.display = 'none';
    } else {
        roundsInput.style.display = 'block';
    }
}

function generateWOD() {
    const workoutType = document.getElementById('workoutType').value;
    const time = parseInt(document.getElementById('time').value);
    const rounds = parseInt(document.getElementById('rounds').value) || null;

    if (selectedExercises.length === 0) {
        alert("최소한 하나의 운동을 선택해주세요.");
        return;
    }

    if (!time) {
        alert("운동 시간을 입력해주세요.");
        return;
    }

    let workout = `${workoutType} `;
    if (rounds && workoutType !== 'AMRAP') {
        workout += `${rounds} Rounds `;
    }
    workout += `for ${time} minutes\n\n`;

    if (workoutType === "EMOM") {
        workout += `Every minute for ${time} minutes:\n`;
    } else if (workoutType === "타바타") {
        workout += "8 라운드, 각 운동 20초 수행, 10초 휴식\n";
    }

    selectedExercises.forEach(exercise => {
        workout += `- ${exercise.reps || 'x'} ${exercise.name}\n`;
    });

    document.getElementById('result').textContent = workout;
}

function generateAIWOD() {
    const workoutType = document.getElementById('workoutType').value;
    const time = parseInt(document.getElementById('time').value);

    if (!time) {
        alert("운동 시간을 입력해주세요.");
        return;
    }

    let workout = `${workoutType} for ${time} minutes\n\n`;
    
    // 사용자 선호도에 따른 운동 선택
    let selectedCategories = userProfile.preferredExerciseTypes;
    if (selectedCategories.length < 2) {
        // 선호 운동이 2개 미만이면 랜덤으로 추가
        const allCategories = Object.keys(exercises).filter(cat => cat !== "네임드 와드");
        while (selectedCategories.length < 2) {
            const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
            if (!selectedCategories.includes(randomCategory)) {
                selectedCategories.push(randomCategory);
            }
        }
    }

    // 각 카테고리에서 운동 선택
    selectedCategories.forEach(category => {
        const exercise = exercises[category][Math.floor(Math.random() * exercises[category].length)];
        let reps = Math.floor(Math.random() * 10 + 5); // 5-15 reps
        reps = Math.round(reps * intensityMultiplier[userProfile.fitnessLevel]);
        workout += `- ${reps} ${exercise}\n`;
    });

    // 운동 순서 랜덤화
    workout = workout.split('\n').sort(() => Math.random() - 0.5).join('\n');

    document.getElementById('result').textContent = workout;
}

// 페이지 로드 시 AMRAP이 기본 선택되도록 설정
window.onload = function() {
    document.getElementById('workoutType').value = 'AMRAP';
    toggleRoundsInput();
};

// Service Worker 등록
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('ServiceWorker registered'))
        .catch(error => console.log('ServiceWorker registration failed: ', error));
}

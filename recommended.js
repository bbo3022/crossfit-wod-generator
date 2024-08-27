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

const workoutTypes = ["AMRAP", "EMOM", "For Time", "타바타"];

const intensityMultiplier = {
    beginner: 0.7,
    intermediate: 1,
    advanced: 1.3
};

function recommendWODs() {
    const level = document.getElementById('fitnessLevel').value;
    if (!level) {
        alert("피트니스 레벨을 선택해주세요.");
        return;
    }

    const recommendations = [];
    for (let i = 0; i < 4; i++) {
        recommendations.push(generateRecommendedWOD(level));
    }

    displayRecommendations(recommendations);
}

function generateRecommendedWOD(level) {
    const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    const time = Math.floor(Math.random() * 15) + 5; // 5-20 minutes
    const exerciseCount = Math.floor(Math.random() * 3) + 2; // 2-4 exercises

    let wod = `${workoutType} for ${time} minutes\n\n`;

    const selectedExercises = [];
    const categories = Object.keys(exercises);

    for (let i = 0; i < exerciseCount; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const exercise = exercises[category][Math.floor(Math.random() * exercises[category].length)];
        
        if (!selectedExercises.includes(exercise)) {
            selectedExercises.push(exercise);
            let reps = Math.floor(Math.random() * 10) + 5; // 5-15 reps
            reps = Math.round(reps * intensityMultiplier[level]);
            wod += `- ${reps} ${exercise}\n`;
        }
    }

    return wod;
}

function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '<h2>추천 WOD:</h2>';
    recommendations.forEach((wod, index) => {
        const wodDiv = document.createElement('div');
        wodDiv.innerHTML = `<h3>WOD ${index + 1}:</h3><pre>${wod}</pre>`;
        container.appendChild(wodDiv);
    });
}

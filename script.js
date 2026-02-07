// Schedule data for group ЕКПМ-11с
const scheduleData = {
    groupName: "ЕКПМ-11с",
    timeSlots: [
        { number: 6, start: "16:40", end: "18:00" },
        { number: 7, start: "18:10", end: "19:30" },
        { number: 8, start: "19:40", end: "21:00" }
    ],
    schedule: {
        monday: [
            {
                lectureNumber: 6,
                weekType: 1,
                title: "Прийняття управлінських рішень",
                teacher: "доц. Демко І.І.",
                type: "сем.",
                room: "ауд.113"
            },
            {
                lectureNumber: 6,
                weekType: 2,
                title: "Методологія наукових досліджень та академічна доброчесність",
                teacher: "проф. Урба С. І.",
                type: "сем.",
                room: "ауд.113"
            },
            {
                lectureNumber: 7,
                weekType: "every",
                title: "Прийняття управлінських рішень",
                teacher: "доц. Демко І.І.",
                type: "лек.",
                room: "ауд.113"
            }
        ],
        tuesday: [
            {
                lectureNumber: 7,
                weekType: 1,
                title: "Економічне управління у бізнес-структурах",
                teacher: "доц. Сухай О. Є.",
                type: "сем.",
                room: "ауд.115"
            },
            {
                lectureNumber: 7,
                weekType: 2,
                title: "Стратегічне управління бізнесом",
                teacher: "доц. Залога З. М.",
                type: "сем.",
                room: "ауд.115"
            },
            {
                lectureNumber: 8,
                weekType: "every",
                title: "Методологія наукових досліджень та академічна доброчесність",
                teacher: "проф. Урба С. І.",
                type: "лек.",
                room: "ауд.115"
            }
        ],
        wednesday: [
            {
                lectureNumber: 7,
                weekType: "every",
                title: "Стратегічне управління бізнесом",
                teacher: "доц. Залога З. М.",
                type: "лек.",
                room: "ауд.115"
            },
            {
                lectureNumber: 8,
                weekType: "every",
                title: "Економічне управління у бізнес-структурах",
                teacher: "доц. Сухай О. Є.",
                type: "лек.",
                room: "ауд.115"
            }
        ],
        thursday: [], // No lectures
        friday: [
            {
                lectureNumber: 6,
                weekType: "every",
                title: "Управлінський облік",
                teacher: "доц. Пилипенко С. А.",
                type: "лек.",
                room: "ауд.115"
            },
            {
                lectureNumber: 7,
                weekType: 1,
                title: "Управлінський облік",
                teacher: "доц. Пилипенко С. А.",
                type: "сем.",
                room: "ауд.115"
            },
            {
                lectureNumber: 7,
                weekType: 2,
                title: "Інноваційний розвиток бізнесу",
                teacher: "доц. Косович Б. І.",
                type: "сем.",
                room: "ауд.115"
            },
            {
                lectureNumber: 8,
                weekType: "every",
                title: "Інноваційний розвиток бізнесу",
                teacher: "доц. Косович Б. І.",
                type: "лек.",
                room: "ауд.115"
            }
        ]
    },
};

// Map short type labels to full words
function formatTypeLabel(shortLabel) {
    if (!shortLabel) return '';
    const trimmed = String(shortLabel).trim();
    if (trimmed === 'лек.') return 'лекція';
    if (trimmed === 'сем.') return 'семінар';
    return trimmed;
}

function getTypePillClass(label) {
    const full = formatTypeLabel(label);
    if (full === 'лекція') return 'type-pill--lecture';
    if (full === 'семінар') return 'type-pill--seminar';
    return '';
}

// Returns the reference date for calculations:
// - Weekdays: today
// - Weekends (Sat/Sun): next Monday
function getReferenceDate() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sun, 6 = Sat
    if (dayOfWeek === 6) {
        // Saturday → add 2 days
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + 2);
        return nextMonday;
    }
    if (dayOfWeek === 0) {
        // Sunday → add 1 day
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + 1);
        return nextMonday;
    }
    return today;
}

// Function to calculate current week from September 1st
function getCurrentWeek() {
    const september1 = new Date(new Date().getFullYear(), 8, 1); // September 1st (month is 0-indexed)
    const referenceDate = getReferenceDate();
    
    // If we're before September 1st, use previous year
    if (referenceDate < september1) {
        september1.setFullYear(september1.getFullYear() - 1);
    }
    
    const timeDiff = referenceDate.getTime() - september1.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    
    return weekNumber;
}

// Function to determine if current week is week 1 or week 2
function getCurrentWeekType() {
    const currentWeek = getCurrentWeek();
    return currentWeek % 2 === 1 ? 1 : 2;
}

// Function to get dates for current week (Monday to Friday)
function getCurrentWeekDates() {
    const referenceDate = getReferenceDate();
    const currentWeek = getCurrentWeek();
    
    // Calculate the Monday of the current week
    const september1 = new Date(new Date().getFullYear(), 8, 1); // September 1st
    if (referenceDate < september1) {
        september1.setFullYear(september1.getFullYear() - 1);
    }
    
    const timeDiff = referenceDate.getTime() - september1.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    const weeksPassed = Math.floor(daysDiff / 7);
    
    // Get Monday of current week
    const mondayOfWeek = new Date(september1);
    mondayOfWeek.setDate(september1.getDate() + (weeksPassed * 7));
    
    // Adjust to get the actual Monday (if September 1st wasn't Monday)
    const dayOfWeek = mondayOfWeek.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, Monday = 1
    mondayOfWeek.setDate(mondayOfWeek.getDate() + daysToMonday);
    
    // If today is weekend (Saturday or Sunday), show next week's Monday
    const todayDayOfWeek = referenceDate.getDay();
    if (todayDayOfWeek === 0 || todayDayOfWeek === 6) { // Sunday = 0, Saturday = 6
        mondayOfWeek.setDate(mondayOfWeek.getDate() + 7); // Move to next week
    }
    
    // Generate dates for Monday to Friday
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
        const date = new Date(mondayOfWeek);
        date.setDate(mondayOfWeek.getDate() + i);
        weekDates.push(date);
    }
    
    return weekDates;
}

// Function to format date as DD.MM
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}

// Function to format date as DD.MM.YYYY (for comparing with additionalSchedule dates)
function formatDateFull(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Function to create lecture HTML element
function createLectureElement(lecture, isCurrentWeek) {
    const div = document.createElement('div');
    div.className = `lecture ${isCurrentWeek ? 'current-week' : 'other-week'}`;
    
    div.innerHTML = `
        <div class="lecture-number">${lecture.title}</div>
        <div class="lecture-teacher">${lecture.teacher}, ${lecture.room}</div>
        <div><span class="type-pill ${getTypePillClass(lecture.type)}">${formatTypeLabel(lecture.type)}</span></div>
    `;
    
    return div;
}

// Function to render the schedule
function renderSchedule() {
    const schedule = document.getElementById('schedule');
    const currentWeekType = getCurrentWeekType();
    const currentWeek = getCurrentWeek();
    
    // Clear existing content to prevent duplicates
    schedule.innerHTML = '';
    
    // Update week info
    const weekTypeText = currentWeekType === 1 ? 'чисельник' : 'знаменник';
    document.getElementById('currentWeekInfo').innerHTML = `
        Поточний тиждень: ${currentWeek} (${weekTypeText})
    `;
    
    // Get current week dates
    const weekDates = getCurrentWeekDates();
    
    // Create header row
    const headerRow = document.createElement('div');
    headerRow.style.display = 'contents';
    
    // Time column header
    const timeHeader = document.createElement('div');
    timeHeader.className = 'time-header';
    timeHeader.textContent = 'Час';
    headerRow.appendChild(timeHeader);
    
    // Day headers with dates
    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця'];
    days.forEach((day, index) => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.innerHTML = `
            <div>${day}</div>
            <div style="font-size: 0.7em; opacity: 0.8; margin-top: 1px;">${formatDate(weekDates[index])}</div>
        `;
        headerRow.appendChild(dayHeader);
    });
    
    schedule.appendChild(headerRow);
    
    // Create rows for each time slot
    scheduleData.timeSlots.forEach(timeSlot => {
        const row = document.createElement('div');
        row.style.display = 'contents';
        
        // Time slot header
        const timeSlotDiv = document.createElement('div');
        timeSlotDiv.className = 'time-slot';
        timeSlotDiv.innerHTML = `
            <div>№${timeSlot.number}</div>
            <div>${timeSlot.start}-</div>
            <div>${timeSlot.end}</div>
        `;
        row.appendChild(timeSlotDiv);
        
        // Day columns
        const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        dayKeys.forEach((dayKey, dayIndex) => {
            const cell = document.createElement('div');
            cell.className = 'lecture-cell';
            
            let dayLectures = scheduleData.schedule[dayKey] || [];
            
            // Check for additional schedule items on Thursday
            if (dayKey === 'thursday' && scheduleData.additionalSchedule && scheduleData.additionalSchedule.thursday) {
                const thursdayDate = weekDates[dayIndex]; // Thursday is at index 3
                const thursdayDateStr = formatDateFull(thursdayDate);
                
                // Filter additional schedule items that match this Thursday's date
                const additionalLectures = scheduleData.additionalSchedule.thursday.filter(lecture => 
                    lecture.date === thursdayDateStr
                );
                
                // Merge additional lectures with regular schedule
                dayLectures = [...dayLectures, ...additionalLectures];
            }
            
            const lecturesForThisTime = dayLectures.filter(lecture => 
                lecture.lectureNumber === timeSlot.number
            );
            
            if (lecturesForThisTime.length === 0) {
                cell.className = 'lecture-cell empty-cell';
                cell.textContent = 'Нема занять';
            } else {
                lecturesForThisTime.forEach(lecture => {
                    let isCurrentWeek = false;
                    
                    if (lecture.weekType === 'every') {
                        isCurrentWeek = true; // Always show "every week" lectures as current
                    } else if (lecture.weekType === currentWeekType) {
                        isCurrentWeek = true;
                    }
                    
                    // Additional schedule items are always shown as current week since they're date-specific
                    if (lecture.date) {
                        isCurrentWeek = true;
                    }
                    
                    const lectureElement = createLectureElement(lecture, isCurrentWeek);
                    cell.appendChild(lectureElement);
                });
            }
            
            row.appendChild(cell);
        });
        
        schedule.appendChild(row);
    });
}

// Mobile day navigation variables
let currentDayIndex = 0;
const dayNames = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця'];
const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

// Function to detect if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Function to get current day index (0 = Monday, 1 = Tuesday, etc.)
function getCurrentDayIndex() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // If it's weekend (Saturday = 6, Sunday = 0), return Monday (0) for next week
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return 0; // Monday of next week
    }
    
    // Convert to Monday = 0, Tuesday = 1, etc.
    return dayOfWeek - 1;
}

// Function to create mobile lecture element
function createMobileLectureElement(lecture, isCurrentWeek) {
    const div = document.createElement('div');
    div.className = `mobile-lecture ${isCurrentWeek ? 'current-week' : 'other-week'}`;
    
    div.innerHTML = `
        <div class="mobile-lecture-title">${lecture.title}</div>
        <div class="mobile-lecture-teacher">${lecture.teacher}, ${lecture.room}</div>
        <div><span class="type-pill ${getTypePillClass(lecture.type)}">${formatTypeLabel(lecture.type)}</span></div>
    `;
    
    return div;
}

// Function to render mobile single day view
function renderMobileDayView(dayIndex) {
    const mobileDayView = document.getElementById('mobileDayView');
    const currentDayDisplay = document.getElementById('currentDayDisplay');
    const currentWeekType = getCurrentWeekType();
    
    // Get current week dates
    const weekDates = getCurrentWeekDates();
    
    // Update day display with date
    currentDayDisplay.innerHTML = `
        <div>${dayNames[dayIndex]}</div>
        <div style="font-size: 0.8em; opacity: 0.8; margin-top: 1px;">${formatDate(weekDates[dayIndex])}</div>
    `;
    
    // Clear previous content
    mobileDayView.innerHTML = '';
    
    const dayKey = dayKeys[dayIndex];
    let dayLectures = scheduleData.schedule[dayKey] || [];
    let additionalLectures = [];
    
    // Check for additional schedule items on Thursday
    if (dayKey === 'thursday' && scheduleData.additionalSchedule && scheduleData.additionalSchedule.thursday) {
        const thursdayDate = weekDates[dayIndex];
        const thursdayDateStr = formatDateFull(thursdayDate);
        
        // Filter additional schedule items that match this Thursday's date
        additionalLectures = scheduleData.additionalSchedule.thursday.filter(lecture => 
            lecture.date === thursdayDateStr
        );
        
        // Merge additional lectures with regular schedule
        dayLectures = [...dayLectures, ...additionalLectures];
    }
    
    // Add orange header for Thursday if there are additional schedule items
    if (dayKey === 'thursday' && additionalLectures.length > 0) {
        const additionalHeader = document.createElement('div');
        additionalHeader.className = 'mobile-additional-header';
        additionalHeader.textContent = 'Пари для відпрацювання!';
        mobileDayView.appendChild(additionalHeader);
    }
    
    if (dayLectures.length === 0) {
        const noLecturesDiv = document.createElement('div');
        noLecturesDiv.className = 'mobile-no-lectures';
        noLecturesDiv.textContent = 'Нема занять';
        mobileDayView.appendChild(noLecturesDiv);
        return;
    }
    
    // Group lectures by time slot
    const lecturesByTime = {};
    dayLectures.forEach(lecture => {
        if (!lecturesByTime[lecture.lectureNumber]) {
            lecturesByTime[lecture.lectureNumber] = [];
        }
        lecturesByTime[lecture.lectureNumber].push(lecture);
    });
    
    // Create time slots
    scheduleData.timeSlots.forEach(timeSlot => {
        const lecturesForThisTime = lecturesByTime[timeSlot.number] || [];
        
        if (lecturesForThisTime.length > 0) {
            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.className = 'mobile-time-slot';
            
            const timeHeader = document.createElement('div');
            timeHeader.className = 'mobile-time-header';
            timeHeader.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>№${timeSlot.number}</span>
                    <span>${timeSlot.start}-${timeSlot.end}</span>
                </div>
            `;
            timeSlotDiv.appendChild(timeHeader);
            
            lecturesForThisTime.forEach(lecture => {
                let isCurrentWeek = false;
                
                if (lecture.weekType === 'every') {
                    isCurrentWeek = true;
                } else if (lecture.weekType === currentWeekType) {
                    isCurrentWeek = true;
                }
                
                // Additional schedule items are always shown as current week since they're date-specific
                if (lecture.date) {
                    isCurrentWeek = true;
                }
                
                const lectureElement = createMobileLectureElement(lecture, isCurrentWeek);
                timeSlotDiv.appendChild(lectureElement);
            });
            
            mobileDayView.appendChild(timeSlotDiv);
        }
    });
}

// Function to navigate to previous day
function goToPreviousDay() {
    currentDayIndex = (currentDayIndex - 1 + dayNames.length) % dayNames.length;
    renderMobileDayView(currentDayIndex);
}

// Function to navigate to next day
function goToNextDay() {
    currentDayIndex = (currentDayIndex + 1) % dayNames.length;
    renderMobileDayView(currentDayIndex);
}

// Function to handle swipe gestures anywhere on the page
function handleSwipe() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    // Add swipe listeners to the entire body for mobile
    document.body.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.body.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Check if horizontal swipe is more significant than vertical
        // Require minimum swipe distance of 50px
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe right - go to previous day
                goToPreviousDay();
            } else {
                // Swipe left - go to next day
                goToNextDay();
            }
        }
    }, { passive: true });
}

// Function to render appropriate view based on device
function renderAppropriateView() {
    if (isMobile()) {
        // Show mobile view
        document.getElementById('schedule').style.display = 'none';
        document.getElementById('mobileDayNav').style.display = 'flex';
        document.getElementById('mobileDayView').style.display = 'block';
        
        // Set current day to today
        currentDayIndex = getCurrentDayIndex();
        renderMobileDayView(currentDayIndex);
        
        // Add event listeners for navigation
        document.getElementById('prevDayBtn').onclick = goToPreviousDay;
        document.getElementById('nextDayBtn').onclick = goToNextDay;
        
        // Add swipe support
        handleSwipe();
    } else {
        // Show desktop view
        document.getElementById('schedule').style.display = 'grid';
        document.getElementById('mobileDayNav').style.display = 'none';
        document.getElementById('mobileDayView').style.display = 'none';
        renderSchedule();
    }
}

// Flag to prevent multiple initializations
let isInitialized = false;

// Initialize the schedule when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (!isInitialized) {
        renderAppropriateView();
        isInitialized = true;
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    renderAppropriateView();
});

// Update schedule every hour to handle week changes
setInterval(function() {
    if (isMobile()) {
        renderMobileDayView(currentDayIndex);
    } else {
        renderSchedule();
    }
}, 60 * 60 * 1000);

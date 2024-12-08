// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-PSKB25Kr4hZFXzHfjnK3sy1QXXBKZQI",
    authDomain: "s4wcoin.firebaseapp.com",
    projectId: "s4wcoin",
    storageBucket: "s4wcoin.firebasestorage.app",
    messagingSenderId: "237771929098",
    appId: "1:237771929098:web:85d674e4cd99fdba6411f3",
    measurementId: "G-99SFMQNM3D"
};

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// تعريف عناصر DOM
const uiElements = {
    balanceDisplay: document.getElementById('balanceAmount'),
    accountBalanceDisplay: document.getElementById('AccountnavbarBalanceDisplay'),
    taskBalanceDisplay: document.getElementById('tasknavbarBalanceDisplay'),
    puzzleBalanceDisplay: document.getElementById('puzzlenavbarBalanceDisplay'),
    boostBalanceDisplay: document.getElementById('BoostnavbarBalanceDisplay'),
    lvlBalanceDisplay: document.getElementById('lvlnavbarBalanceDisplay'),
    miningBalanceDisplay: document.getElementById('miningnavbarBalanceDisplay'),
    walletBalanceDisplay: document.getElementById('navbarBalanceDisplay'),
    settingsBalanceDisplay: document.getElementById('settingsBalanceDisplay'),
    gnavbarBalanceDisplay: document.getElementById('gnavbarBalanceDisplay'),
    
    energyBar: document.getElementById('energyBar'),
    energyInfo: document.getElementById('energyInfo'),
    languageBtn: document.getElementById('languageSwitchBtn'),
    boostLevelDisplay: document.getElementById('boostLevel'),
    multiplierDisplay: document.getElementById('clickMultiplier'),
    coinBoostLevelDisplay: document.getElementById('coinBoostLevel'),
    coinUpgradeCost: document.getElementById('coinUpgradeCost'),
    boostUpgradeCost: document.getElementById('boostUpgradeCost'),
    upgradeImage: document.getElementById('upgradeImage'),
    
    currentLevel: document.getElementById('currentLevel'),  // عنصر يعرض المستوى الحالي
    currentCoins: document.getElementById('currentCoins'),  // عنصر يعرض العملات الحالية
    upgradeCost: document.getElementById('upgradeCost'),    // عنصر يعرض تكلفة الترقية
    purchaseNotification: document.getElementById('purchaseNotification'),
    copyInviteNotification: document.getElementById('copyInviteNotification'),
    clickableImg: document.getElementById('clickableImg'),
    navButtons: document.querySelectorAll('.menu button'),
    contentScreens: document.querySelectorAll('.screen-content'),
    splashScreen: document.querySelector('.splash-screen'),
    mainContainer: document.querySelector('.container'),
    levelFloatingBtn: document.getElementById('levelFloatingBtn'),
    confirmUpgradeBtn: document.getElementById('confirmUpgradeBtn'),
    cancelUpgradeBtn: document.getElementById('cancelUpgradeBtn'),
    upgradeModal: document.getElementById('upgradeConfirmation'),
    closeModal: document.getElementById('closeModal'),
    fillEnergyBtn: document.getElementById('fillEnergyBtn'),
    withdrawBtn: document.getElementById('withdrawBtn'),
    withdrawalForm: document.getElementById('withdrawalForm'),
    confirmWithdrawalBtn: document.getElementById('confirmWithdrawalBtn'),
    maxWithdrawBtn: document.getElementById('maxWithdrawBtn'),
    withdrawAmountInput: document.getElementById('withdrawAmount'),
    userTelegramNameDisplay: document.getElementById('userTelegramName'),
    userTelegramIdDisplay: document.getElementById('userTelegramId'),
    //taskTwoBtn: document.getElementById('taskTwoBtn'),
    //taskThreeBtn: document.getElementById('taskThreeBtn'),
   // taskTwoProgress: document.getElementById('taskTwoProgress'),
    //taskThreeProgress: document.getElementById('taskThreeProgress'),
    levelInfoDisplay: document.getElementById('currentLevelInfo') || { innerText: '' },
    friendsListDisplay: document.getElementById('friendsList') || { innerHTML: '' },
    displayedLevel: document.getElementById('displayedLevel'),
    currentLevelName: document.getElementById('currentLevelName'),
    levelOneProgress: document.getElementById('levelOneProgress'),
    levelTwoProgress: document.getElementById('levelTwoProgress'),
    levelThreeProgress: document.getElementById('levelThreeProgress'),
    levelFourProgress: document.getElementById('levelFourProgress'),
    levelFiveProgress: document.getElementById('levelFiveProgress'),
    levelSixProgress: document.getElementById('levelSixProgress'),
    levelSevenProgress: document.getElementById('levelSevenProgress'),
    levelEightProgress: document.getElementById('levelEightProgress'),
    levelNineProgress: document.getElementById('levelNineProgress'),
    levelTenProgress: document.getElementById('levelTenProgress'),
    boostUpgradeBtn: document.getElementById('boostUpgradeBtn'),
    coinUpgradeBtn: document.getElementById('coinUpgradeBtn'),
    fillEnergyUpgradeBtn: document.getElementById('fillEnergyBtn'),
    inviteFriendsBtn: document.getElementById('inviteFriendsBtn'),
    copyInviteLinkBtn: document.getElementById('copyInviteLinkBtn'),

};

// حالة اللعبة
let gameState = {
    balance: 0,
    energy: 500,
    maxEnergy: 500,
    clickMultiplier: 1,
    boostLevel: 1,
    coinBoostLevel: 1,
    energyBoostLevel: 1,
    currentLevel: 1,
    achievedLevels: [],
    friends: 0,
    energy_last_update: new Date().toISOString(),  // تحويل الطابع الزمني إلى تنسيق ISO
    invites: [],
    claimedRewards: { levels: [] },
    tasksprogress: [],
    completedTasks: [],
    puzzlesprogress: [],
    usedPromoCodes: [],
    lastLoginDate: null, // تاريخ آخر تسجيل دخول
    consecutiveDays: 0,  // عدد الأيام المتتالية التي تم المطالبة فيها بالمكافآت
};

async function updateGameStateInDatabase(updatedData) {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDoc = doc(db, "users", userId);

    try {
        await updateDoc(userDoc, updatedData);
        console.log('Game state updated successfully in Firebase.');
} catch (error) {
        console.error('Error updating game state in Firebase:', error);
    }
}

async function loadGameState() {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDoc = doc(db, "users", userId);

    try {
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            gameState = { ...gameState, ...data };
            console.log('Loaded game state:', data);
            updateUI();
        } else {
            console.warn('No game state found for this user.');
        }
    } catch (error) {
        console.error('Error loading game state from Firebase:', error);
    }
}
  
 async function saveGameState() {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDoc = doc(db, "users", userId);

    try {
        await setDoc(userDoc, { ...gameState }, { merge: true });
        console.log('Game state saved successfully.');
    } catch (error) {
        console.error('Error saving game state in Firebase:', error);
    }
 }



async function restoreEnergy() {
    try {
        const currentTime = Date.now();
        const timeDiff = currentTime - gameState.energyLastUpdate;

        const recoveredEnergy = Math.floor(timeDiff / (4 * 60 * 1000)); // استعادة الطاقة كل 4 دقائق
        gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + recoveredEnergy);
        gameState.energy_last_update = currentTime; // تحديث وقت آخر استعادة

        updateUI();
        await saveGameState();
        console.log('Energy restored successfully.');
    } catch (err) {
        console.error('Error restoring energy:', err.message);
        showNotificationWithStatus(uiElements.purchaseNotification, `Failed to restore energy. Please reload.`, 'lose');
    }
}



import { onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

function listenToRealtimeChanges() {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDoc = doc(db, "users", userId);

    onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const updatedData = docSnapshot.data();
            console.log('Realtime update received:', updatedData);
            gameState = { ...gameState, ...updatedData };
            updateUI();
        }
    });
}



// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', async () => {
    await loadGameState();   
    await restoreEnergy();
    startEnergyRecovery();
    updateGameStateInDatabase(); 
    listenToRealtimeChanges();   
    await initializeApp();  
    updateBoostsDisplay();
});


document.addEventListener("DOMContentLoaded", function() {
    updateUI(); // تأكد من تحديث الرصيد عند تحميل الصفحة
});


// مستويات اللعبة المتناسقة
const levelThresholds = [
    { level: 1, threshold: 400000, name: 'Veteran' },
    { level: 2, threshold: 500000, name: 'Master' },
    { level: 3, threshold: 600000, name: 'Guru' },
    { level: 4, threshold: 700000, name: 'Sage' },
    { level: 5, threshold: 800000, name: 'Legend' },
    { level: 6, threshold: 900000, name: 'Hero' },
    { level: 7, threshold: 1000000, name: 'Champion' },
    { level: 8, threshold: 1100000, name: 'Guardian' },
    { level: 9, threshold: 1500000, name: 'Titan' },
    { level: 10, threshold: 2000000, name: 'Mythic' },
    { level: 11, threshold: 2500000, name: 'Deity' },
    { level: 12, threshold: 3000000, name: 'Immortal' },
    { level: 13, threshold: 3500000, name: 'Supreme' },
    { level: 14, threshold: 4000000, name: 'Celestial' },
    { level: 15, threshold: 4500000, name: 'Divine' },
    { level: 16, threshold: 5000000, name: 'Omni' },
    { level: 17, threshold: 5500000, name: 'Cosmic' },
    { level: 18, threshold: 6000000, name: 'Infinite' },
    { level: 19, threshold: 6500000, name: 'Transcendent' },
    { level: 20, threshold: 7000000, name: 'Epoch' },
    { level: 21, threshold: 7500000, name: 'Eon' },
    { level: 22, threshold: 8500000, name: 'Legendary' },
    { level: 23, threshold: 9000000, name: 'Eternal' },
    { level: 24, threshold: 9500000, name: 'Sentinel' },
    { level: 25, threshold: 10000000, name: 'Archon' },
    { level: 26, threshold: 10500000, name: 'Ascendant' },
    { level: 27, threshold: 11050000, name: 'Paragon' },
    { level: 28, threshold: 12000000, name: 'Aether' },
    { level: 29, threshold: 13000000, name: 'Quantum' },
    { level: 30, threshold: 13050000, name: 'Infinity' },
];

async function checkForLevelUp() {
    for (let i = 0; i < levelThresholds.length; i++) {
        const levelData = levelThresholds[i];

        if (
            gameState.balance >= levelData.threshold &&
            gameState.currentLevel < levelData.level &&
            !gameState.achievedLevels.includes(levelData.level)
        ) {
            gameState.currentLevel = levelData.level;
            gameState.achievedLevels.push(levelData.level);

            updateUI();

            const userId = uiElements.userTelegramIdDisplay.innerText;
            const userDoc = doc(db, "users", userId);

            try {
                await updateDoc(userDoc, {
                    currentLevel: gameState.currentLevel,
                    achieved_levels: gameState.achievedLevels,
                });
                console.log('Level updated successfully.');
            } catch (error) {
                console.error('Error updating levels:', error);
            }

            break;
        }
    }
}




async function initializeApp() {
    try {
        console.log('Initializing app...');
        await fetchUserDataFromTelegram();

        setTimeout(() => {
            if (uiElements.splashScreen) uiElements.splashScreen.style.display = 'none';
            if (uiElements.mainContainer) uiElements.mainContainer.style.display = 'flex';
        }, 2000);

        listenToRealtimeChanges();
        updateUI();
        registerEventHandlers();
        startEnergyRecovery();

        console.log('App initialized successfully.');
    } catch (error) {
        console.error('Error initializing app:', error);
        showNotification(uiElements.purchaseNotification, 'Failed to initialize app.');
    }
}


import { getDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

async function fetchUserDataFromTelegram() {
    const telegramApp = window.Telegram.WebApp;
    telegramApp.ready();

    const userTelegramId = telegramApp.initDataUnsafe.user?.id;
    const userTelegramName = telegramApp.initDataUnsafe.user?.username;
    const isPremium = telegramApp.initDataUnsafe.user?.is_premium;

    if (!userTelegramId || !userTelegramName) {
        throw new Error("Failed to fetch Telegram user data.");
    }

    uiElements.userTelegramIdDisplay.innerText = userTelegramId;
    uiElements.userTelegramNameDisplay.innerText = userTelegramName;

    const userDoc = doc(db, "users", userTelegramId);

    try {
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
            gameState = { ...gameState, ...userSnapshot.data() };
            saveGameState();
            loadFriendsList();
        } else {
            // تسجيل مستخدم جديد
            await setDoc(userDoc, {
                telegram_id: userTelegramId,
                username: userTelegramName,
                balance: gameState.balance,
            });
        }
    } catch (error) {
        console.error("Error fetching or creating user data:", error);
    }
}



function updateUI() {
    // تنسيق الرصيد: استخدام toLocaleString مع الفواصل المناسبة
    let formattedBalance = gameState.balance.toLocaleString("en-US", {
        minimumFractionDigits: 0,  // لا نريد عرض الفواصل العشرية إذا لم تكن ضرورية
        maximumFractionDigits: 0   // نفس الشيء هنا لإزالة الأصفار غير الضرورية
    });

    // تحديد الجزء الرئيسي والجزء الباقي بناءً على الحجم
    let mainDigits, remainingDigits;

    if (gameState.balance >= 1_000_000_000) {
        // مليارات: الرقم الأول كبير
        mainDigits = formattedBalance.split(",")[0]; // الرقم الأول فقط
        remainingDigits = formattedBalance.slice(mainDigits.length); // باقي الأرقام
    } else if (gameState.balance >= 1_000_000) {
        // ملايين: الرقم الأول أو أول رقمين كبير
        mainDigits = formattedBalance.split(",")[0]; // الرقم الأول فقط
        remainingDigits = formattedBalance.slice(mainDigits.length); // باقي الأرقام
    } else if (gameState.balance >= 1_000) {
        // آلاف: أول 3 أرقام كبيرة
        mainDigits = formattedBalance.split(",")[0]; // أول 3 أرقام
        remainingDigits = formattedBalance.slice(mainDigits.length); // باقي الأرقام
    } else {
        // أقل من ألف: الرقم بالكامل
        mainDigits = formattedBalance;
        remainingDigits = "";
    }

    // تحديث DOM
    const mainDigitsElement = document.getElementById("mainDigits");
    const remainingDigitsElement = document.getElementById("remainingDigits");

    if (mainDigitsElement && remainingDigitsElement) {
        mainDigitsElement.textContent = mainDigits;
        remainingDigitsElement.textContent = remainingDigits;
    }

    // تحديث باقي عناصر الرصيد في الواجهة
    const balanceElements = [
        uiElements.walletBalanceDisplay,
        uiElements.accountBalanceDisplay,
        uiElements.taskBalanceDisplay,
        uiElements.puzzleBalanceDisplay,
        uiElements.settingsBalanceDisplay,
        uiElements.boostBalanceDisplay,
        uiElements.lvlBalanceDisplay,
        uiElements.gnavbarBalanceDisplay,
        uiElements.miningBalanceDisplay
    ];

    balanceElements.forEach(element => {
        if (element) {
            element.innerText = formattedBalance;
        }
    });

    // تحديث شريط الطاقة
    if (uiElements.energyBar) {
        const energyPercent = (gameState.energy / gameState.maxEnergy) * 100;
        uiElements.energyBar.style.width = `${energyPercent}%`;
    }

    // تحديث معلومات الطاقة
    if (uiElements.energyInfo) {
        uiElements.energyInfo.innerText = `${formatNumber(gameState.energy)}/${formatNumber(gameState.maxEnergy)}⚡`;
    }

    // تحديث اسم المستوى الحالي
    if (uiElements.currentLevelName) {
        const currentLevelName = levelThresholds[gameState.currentLevel - 1]?.name || "Unknown";
        uiElements.currentLevelName.innerText = currentLevelName;
    }

    // تحديث المستوى المعروض
    if (uiElements.displayedLevel) {
        uiElements.displayedLevel.innerText = ` ${gameState.currentLevel}`;
    }

    // تحديث مضاعف النقرة
    if (uiElements.clickMultiplierDisplay) {
        uiElements.clickMultiplierDisplay.innerText = gameState.clickMultiplier;
    }

    // تحديث مستوى التعزيز
    if (uiElements.boostLevelDisplay) {
        uiElements.boostLevelDisplay.innerText = gameState.boostLevel;
    }

    // حفظ حالة اللعبة محليًا
    saveGameState();

    // تحديث شاشات التحسينات والمستويات
    updateBoostsDisplay();
    updateLevelDisplay();

    // إرسال البيانات الجديدة إلى قاعدة البيانات
    updateGameStateInDatabase({
        balance: gameState.balance,
        energy: gameState.energy,
        currentLevel: gameState.currentLevel,
        click_multiplier: gameState.clickMultiplier,
        boost_level: gameState.boostLevel,
        coin_boost_level: gameState.coinBoostLevel,
    });
}


function formatNumber(value) {
    if (value >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(2)}T`;
    } else if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(2)}M`; // الملايين
    } else if (value >= 1_000) {
        return `${(value / 1_000).toFixed(2)}K`; // الآلاف
    } else {
        return value.toLocaleString();
    }
}

// تسجيل الأحداث للمستخدم
function registerEventHandlers() {
    if (uiElements.clickableImg) {
        uiElements.clickableImg.addEventListener('click', handleClick);
        uiElements.clickableImg.addEventListener('touchstart', handleClick);
    }

    if (uiElements.navButtons) {
        uiElements.navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetScreen = button.getAttribute('data-target');
                navigateToScreen(targetScreen);
            });
        });
    }

    if (uiElements.levelFloatingBtn) {
        uiElements.levelFloatingBtn.addEventListener('click', () => {
            navigateToScreen('levelPage');
            if (uiElements.levelInfoDisplay) {
                uiElements.levelInfoDisplay.innerText = `Lvl number : ${gameState.currentLevel}`;
            }
            if (uiElements.displayedLevel) {
                uiElements.displayedLevel.innerText = gameState.currentLevel;
            }
        });
    }

    if (uiElements.confirmUpgradeBtn) {
        uiElements.confirmUpgradeBtn.addEventListener('click', confirmUpgradeAction);
    }

    if (uiElements.cancelUpgradeBtn) {
        uiElements.cancelUpgradeBtn.addEventListener('click', () => {
            if (uiElements.upgradeModal) uiElements.upgradeModal.style.display = 'none';
        });
    }

    if (uiElements.fillEnergyBtn) {
        uiElements.fillEnergyBtn.addEventListener('click', fillEnergyAction);
    }
    
    if (uiElements.fillEnergyUpgradeBtn) {
        uiElements.fillEnergyUpgradeBtn.addEventListener('click', () => {
            showUpgradeModal('energy');
        });
    }


    if (uiElements.confirmWithdrawalBtn) {
        uiElements.confirmWithdrawalBtn.addEventListener('click', () => {
            showNotification(uiElements.purchaseNotification, 'Coming Soon!');
        });
    }

    if (uiElements.languageBtn) {
        uiElements.languageBtn.addEventListener('click', () => {
            showNotification(uiElements.purchaseNotification, 'Language switch coming soon!');
        });
    }

    if (uiElements.inviteFriendsBtn) {
        uiElements.inviteFriendsBtn.addEventListener('click', () => {
            openTelegramChat();
        });
    }

    if (uiElements.copyInviteLinkBtn) {
        uiElements.copyInviteLinkBtn.addEventListener('click', copyInviteLink);
    }

    if (uiElements.maxWithdrawBtn) {
        uiElements.maxWithdrawBtn.addEventListener('click', () => {
            if (uiElements.withdrawAmountInput) {
                uiElements.withdrawAmountInput.value = gameState.balance;
            }
        });
    }
}

//////////////////////////


// عرض الإشعارات للمستخدم
function showNotification(notificationElement, message) {
    if (!notificationElement) return;
    notificationElement.innerText = message;
    notificationElement.classList.add('show');
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 4000);
}

function showNotificationWithStatus(notificationElement, message, status = '') {
    if (!notificationElement) return;

    // مسح الفئات السابقة للفوز أو الخسارة أو الخطأ أو الرسالة
    notificationElement.classList.remove('win', 'lose', 'error', 'message');

    // إعداد رابط الصورة بناءً على الحالة
    let imageUrl = '';
    if (status === 'win') {
        notificationElement.classList.add('win');
        imageUrl = 'i/done.png'; // رابط الصورة لحالة الفوز
    } else if (status === 'lose') {
        notificationElement.classList.add('lose');
        imageUrl = 'i/mistake.png'; // رابط الصورة لحالة الخسارة
    } else if (status === 'error') {
        notificationElement.classList.add('error');
        imageUrl = 'i/error.png'; // رابط الصورة لحالة الخطأ
    } else if (status === 'message') {
        notificationElement.classList.add('message');
        imageUrl = 'i/message.png'; // رابط الصورة للإشعار العادي
    }

    // إضافة الصورة مع الرسالة باستخدام innerHTML
    notificationElement.innerHTML = `<img src="${imageUrl}" class="notification-image" alt=""> ${message}`;

    // إظهار الإشعار
    notificationElement.classList.add('show');

    // إخفاء الإشعار بعد 4 ثوانٍ
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 4000);
}




/////////////////////////////////////////





// استدعاء الصورة القابلة للنقر
const img = document.getElementById('clickableImg');

// التعامل مع النقر أو اللمس
img.addEventListener('pointerdown', (event) => {
    event.preventDefault(); // منع السلوك الافتراضي
    const rect = img.getBoundingClientRect();

    // حساب موقع النقرة بالنسبة للصورة
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // تأثير الإمالة
    const rotateX = ((y / rect.height) - 0.6) * -25;
    const rotateY = ((x / rect.width) - 0.6) * 25;

    // تطبيق التحريك السلس
    img.style.transition = 'transform 0.1s ease-out';
    img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // استدعاء وظيفة النقر
    handleClick(event);

    // إعادة الوضع الطبيعي للصورة بعد التأثير
    setTimeout(() => {
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }, 300);
});

// التعامل مع النقر أو اللمس
function handleClick(event) {
    event.preventDefault(); // منع السلوك الافتراضي لمنع التكرار غير الضروري

    // التعامل مع النقاط: اللمس أو النقر الفردي
    const touchPoints = event.touches ? Array.from(event.touches) : [event];

    // إنشاء تأثير الألماس لكل نقطة
    touchPoints.forEach(touch => {
        createDiamondCoinEffect(touch.pageX, touch.pageY);
    });

    // حساب الطاقة المطلوبة لكل لمسة
    const totalTouches = touchPoints.length;
    const requiredEnergy = gameState.clickMultiplier * totalTouches;

    if (gameState.energy >= requiredEnergy) {
        // تحديث الرصيد والطاقة
        gameState.balance += gameState.clickMultiplier * totalTouches;
        gameState.energy -= requiredEnergy;

        // حفظ الحالة وتحديث الواجهة
        saveGameState();
        updateUI();

        // إرسال البيانات إلى قاعدة البيانات
        updateGameStateInDatabase({
            balance: gameState.balance,
            energy: gameState.energy,
        });
    } else {
        // عرض إشعار بنقص الطاقة
        showNotification(uiElements.purchaseNotification, 'Not enough energy!');
    }
}

// وظيفة إنشاء تأثير الرقم فقط
function createDiamondCoinEffect(x, y) {
    const diamondText = document.createElement('div'); // إنشاء العنصر للنص فقط
    diamondText.classList.add('diamond-text');
    diamondText.textContent = `+${gameState.clickMultiplier}`; // عرض الرقم فقط
    document.body.appendChild(diamondText);

    // تحديد الموقع الأولي للنص
    diamondText.style.left = `${x}px`;
    diamondText.style.top = `${y}px`;

    // الحصول على موقع عرض الرصيد لتحريك النص نحوه
    const balanceRect = uiElements.balanceDisplay.getBoundingClientRect();

    // تحريك النص بسلاسة
    setTimeout(() => {
        diamondText.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        diamondText.style.transform = `translate(${balanceRect.left - x}px, ${balanceRect.top - y}px) scale(0.5)`;
        diamondText.style.opacity = '0';

        // إزالة النص بعد انتهاء الحركة
        setTimeout(() => {
            diamondText.remove();
        }, 800);
    }, 50);
}






//////////////////////////////////////////////////




// الانتقال بين الشاشات
function navigateToScreen(screenId) {
    if (uiElements.contentScreens) {
        uiElements.contentScreens.forEach(screen => {
            screen.classList.remove('active');
        });
    }
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');

    // تحقق إذا كانت الصفحة هي واحدة من الصفحات التي لا تحتوي على القائمة السفلية
    const pagesWithoutFooter = ['levelPage', 'gamePage', 'miningPage', 'walletPage']; // الصفحات التي لا تحتوي على القائمة السفلية
    const isFooterPage = !pagesWithoutFooter.includes(screenId); // إذا كانت الصفحة ليست ضمن هذه القائمة

    // إخفاء أو إظهار القائمة السفلية بناءً على ما إذا كانت الصفحة تحتوي على القائمة السفلية أم لا
    const footerMenu = document.querySelector('.menu'); // تحديد القائمة السفلية باستخدام الكلاس
    if (isFooterPage) {
        footerMenu.style.display = 'flex'; // إظهار القائمة السفلية في الصفحات التي تحتوي عليها
    } else {
        footerMenu.style.display = 'none'; // إخفاء القائمة السفلية في الصفحات الأخرى
    }
}




function startEnergyRecovery() {
    setInterval(() => {
        if (gameState.energy < gameState.maxEnergy) {
            gameState.energy = Math.min(gameState.maxEnergy, gameState.energy + 15);
            gameState.energyLastUpdate = Date.now();

            updateUI();
            saveGameState();
            updateGameStateInDatabase({
                energy: gameState.energy,
                energy_last_update: gameState.energyLastUpdate,
            });
        }
    }, 3000);
}



//////////////////////////////////


// المستويات
function updateLevelDisplay() {
    checkForLevelUp(); // تحقق من الترقية

    const currentLevelData = levelThresholds.find(lvl => lvl.level === gameState.currentLevel);

    if (currentLevelData) {
        const progress = Math.min(gameState.balance / currentLevelData.threshold, 1) * 100; // حساب التقدم المشترك

        // تحديث العناصر الرئيسية
        const mainLevelCoinsElement = document.getElementById('currentLevelCoins');
        const mainEnergyFill = document.getElementById('levelEnergyFill');

        if (mainLevelCoinsElement && mainEnergyFill) {
            mainLevelCoinsElement.innerText = `Next Lvl : ${Math.round(progress)}%`;
            mainEnergyFill.style.width = `${progress}%`;
        }

        // تحديث صفحة المستويات
        const levelPageName = document.getElementById('levelPageCurrentLevelName');
        const levelPageCoinsElement = document.getElementById('levelPageCurrentLevelCoins');
        const levelPageEnergyFill = document.getElementById('levelPageEnergyFill');

        if (levelPageName && levelPageCoinsElement && levelPageEnergyFill) {
            levelPageName.innerText = `Lvl : ${currentLevelData.name}`;

            levelPageCoinsElement.innerText = `Next Lvl : ${Math.round(progress)}%`;
            levelPageEnergyFill.style.width = `${progress}%`;
        }

        // تحديث الزر العائم
        const floatingButtonName = document.getElementById('currentLevelName');

        if (floatingButtonName) {
            floatingButtonName.innerText = `Lvl : ${currentLevelData.name}`;
        }
    }

    // تحديد العنصر النشط
    document.querySelectorAll('.level-item').forEach(item => {
        item.classList.remove('current-level');
    });

    const currentLevelElement = document.getElementById(`level${gameState.currentLevel}`);
    if (currentLevelElement) {
        currentLevelElement.classList.add('current-level');
    }
}


///////////////////


import { getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

async function loadFriendsList() {
    const userId = uiElements.userTelegramIdDisplay.innerText;

    if (!userId) {
        console.error("User ID is missing.");
        uiElements.friendsListDisplay.innerHTML = `<li>Error: Unable to load friends list. Please try again later.</li>`;
        return;
    }

    try {
        // جلب قائمة الأصدقاء من قاعدة البيانات
        const userDoc = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDoc);

        if (!userSnapshot.exists()) {
            console.error("User data not found.");
            uiElements.friendsListDisplay.innerHTML = `<li>No data found for this user.</li>`;
            return;
        }

        const data = userSnapshot.data();
        const invites = data.invites || [];

        if (invites.length > 0) {
            uiElements.friendsListDisplay.innerHTML = ''; // مسح القائمة القديمة

            // جلب بيانات الأصدقاء بما في ذلك الرصيد لكل معرف
            const friendsPromises = invites.map(async (friendId) => {
                const friendDoc = doc(db, "users", friendId);
                const friendSnapshot = await getDoc(friendDoc);
                return friendSnapshot.exists() ? friendSnapshot.data() : null;
            });

            const friendsData = await Promise.all(friendsPromises);

            // عرض الأصدقاء مع رصيدهم
            friendsData.forEach((friend) => {
                if (friend) {
                    const li = document.createElement('li');
                    li.classList.add('friend-item');

                    // إنشاء الصورة
                    const img = document.createElement('img');
                    img.src = 'i/users.jpg';
                    img.alt = `${friend.telegram_id} Avatar`;
                    img.classList.add('friend-avatar');

                    // إضافة معرّف الصديق
                    const span = document.createElement('span');
                    span.classList.add('friend-name');
                    span.textContent = `ID: ${friend.telegram_id}`;

                    // إضافة الرصيد
                    const balanceSpan = document.createElement('span');
                    balanceSpan.classList.add('friend-balance');
                    balanceSpan.textContent = `${formatNumber(friend.balance)} $S4W`;

                    // بناء العنصر
                    li.appendChild(img);
                    li.appendChild(span);
                    li.appendChild(balanceSpan);

                    uiElements.friendsListDisplay.appendChild(li);
                }
            });

            // تحديث العدد الإجمالي
            const totalFriendsCount = invites.length;
            document.getElementById('invitedCount').innerText = totalFriendsCount;
            document.getElementById('settingsInvitedCount').innerText = totalFriendsCount;
        } else {
            uiElements.friendsListDisplay.innerHTML = '<li>No friends invited yet.</li>';
            document.getElementById('invitedCount').innerText = 0;
            document.getElementById('settingsInvitedCount').innerText = 0;
        }
    } catch (err) {
        console.error("Error loading friends list:", err);
        uiElements.friendsListDisplay.innerHTML = `<li>Error loading friends. Please try again later.</li>`;
    }
}



// نسخ رابط الدعوة
function copyInviteLink() {
    const inviteLink = `https://t.me/SAWCOIN_BOT?start=${uiElements.userTelegramIdDisplay?.innerText || ''}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
        showNotification(uiElements.copyInviteNotification, 'Invite link copied!');
    }).catch(err => {
        showNotification(uiElements.purchaseNotification, 'Failed to copy invite link.');
    });
}

// مشاركة الدعوة عبر Telegram
function openTelegramChat() {
    const inviteLink = `https://t.me/share/url?text=Join SawCoin Game and earn 5,000 $S4W!&url=https://t.me/SAWCOIN_BOT?start=${uiElements.userTelegramIdDisplay?.innerText || ''}`;
    window.open(inviteLink, '_blank');
}

import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

async function updateUserData() {
    const userId = uiElements.userTelegramIdDisplay.innerText;

    try {
        const userDocRef = doc(db, "users", userId);

        // تحديث بيانات المستخدم في Firebase
        await updateDoc(userDocRef, {
            balance: gameState.balance,
            energy: gameState.energy,
            max_energy: gameState.maxEnergy,
            click_multiplier: gameState.clickMultiplier,
            boost_level: gameState.boostLevel,
            coin_boost_level: gameState.coinBoostLevel,
            energy_boost_level: gameState.energyBoostLevel,
            current_level: gameState.currentLevel,
            friends: gameState.friends,
            energy_last_update: new Date(gameState.energy_last_update).toISOString(),
            invites: gameState.invites,
            claimed_rewards: gameState.claimedRewards,
            tasks_progress: gameState.tasksprogress,
            completed_tasks: gameState.completedTasks,
            puzzles_progress: gameState.puzzlesprogress,
            used_Promo_Codes: gameState.usedPromoCodes,
            achieved_Levels: gameState.achievedLevels,
            last_login_date: gameState.lastLoginDate ? new Date(gameState.lastLoginDate).toISOString() : null,
            consecutive_days: gameState.consecutiveDays,
        });

        console.log('User data updated successfully in Firebase');
    } catch (error) {
        console.error('Error updating user data in Firebase:', error);
    }
}




////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
    // تهيئة الإعلانات بعد تحميل الصفحة
    const AdController = window.Adsgram.init({ blockId: "int-5511" });
    const button = document.getElementById('ad');
    const purchaseNotification = uiElements.purchaseNotification; // تأكد من وجود هذا العنصر

    // تحقق من وجود العناصر
    if (!button || !purchaseNotification) {
        console.error('Elements not found');
        return;
    }

    // تعريف المكافأة (مثل 1000 عملة)
    const rewardAmount = 1000;

    button.addEventListener('click', () => {
        AdController.show().then((result) => {
            // المستخدم شاهد الإعلان حتى النهاية أو تفاعل معه
            // مكافأة المستخدم
            rewardUser(rewardAmount);
            showNotificationWithStatus(purchaseNotification, `You got me ${rewardAmount} $S4W for watching the ad`, 'win');
        }).catch((result) => {
            // معالجة الحالة إذا حدثت مشكلة في عرض الإعلان
            console.error('mistake ', result);
            showNotification(purchaseNotification, 'Sorry, an error occurred while viewing');
        });
    });

    // دالة مكافأة المستخدم
    function rewardUser(amount) {
        // إضافة المكافأة إلى رصيد المستخدم (تأكد من دمج هذا مع منطق اللعبة الحالي)
        gameState.balance += amount;

        updateUI();
        saveGameState();
        updateGameStateInDatabase({
            balance: gameState.balance,
        });
    }
});




//////////////////////////////////////


// القائمه السفليه
document.querySelectorAll('button[data-target]').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        document.querySelectorAll('.screen-content').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

// أولاً: الحصول على جميع الأزرار داخل القائمة
const buttons = document.querySelectorAll('.menu button');

// ثانياً: إضافة مستمع للأحداث (Event Listener) لكل زر بحيث يستمع للنقرات
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // عند النقر على زر، يتم إزالة الصف "active" من جميع الأزرار
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // إضافة الصف "active" للزر الذي تم النقر عليه
        this.classList.add('active');
        
        // الحصول على اسم الصفحة أو القسم المستهدف من الزر الذي تم النقر عليه
        const targetPage = this.getAttribute('data-target');
        
        // عرض القسم المناسب
        document.querySelectorAll('.screen-content').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(targetPage).classList.add('active');
    });
});

// ثالثاً: تفعيل الزر الافتراضي (الصفحة الرئيسية)
window.addEventListener('DOMContentLoaded', () => {
    const defaultButton = document.querySelector('button[data-target="mainPage"]'); // افترض أن الصفحة الرئيسية لها data-target="mainPage"
    if (defaultButton) {
        defaultButton.classList.add('active'); // تفعيل الزر افتراضياً
        const defaultScreen = document.getElementById('mainPage'); // افترض أن الصفحة الرئيسية لها ID="mainPage"
        if (defaultScreen) {
            defaultScreen.classList.add('active'); // عرض الشاشة المرتبطة افتراضياً
        }
    }
});



///////////////////////////////////////////

window.Telegram.WebApp.setHeaderColor('#000000');
window.Telegram.WebApp.setBackgroundColor('#000000');

//////////////////////////////////////


 import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const taskContainer = document.querySelector('#taskcontainer');
    if (!taskContainer) {
        console.error('Task container element not found.');
        return;
    }

    // جلب المهام المكتملة من قاعدة البيانات (Firebase)
    const userId = uiElements.userTelegramIdDisplay.innerText;
    let completedTasks = [];

    try {
        const userDocRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            completedTasks = userSnapshot.data()?.completed_tasks || [];
        } else {
            console.error('User not found in Firebase');
        }
    } catch (err) {
        console.error('Unexpected error while fetching completed tasks:', err);
    }

    // جلب قائمة المهام من ملف JSON
    fetch('json/tasks.json')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task-item');

                // صورة المهمة
                const img = document.createElement('img');
                img.src = task.image;
                img.alt = 'Task Image';
                img.classList.add('task-img');
                taskElement.appendChild(img);

                // Create a container for description and reward
                const infoContainer = document.createElement('div');
                infoContainer.classList.add('info-task'); // This will hold both description and reward

                // Task Description
                const description = document.createElement('p');
                description.textContent = task.description;
                infoContainer.appendChild(description);

                // Task Reward without Coin Image
                const rewardContainer = document.createElement('div');
                rewardContainer.classList.add('task-reward-container');
            
                const rewardText = document.createElement('span');
                rewardText.textContent = `+ ${task.reward} $S4W`;
                rewardText.classList.add('task-reward');
                rewardContainer.appendChild(rewardText);

                infoContainer.appendChild(rewardContainer); // Append reward below description

                taskElement.appendChild(infoContainer); // Append the info container to the task element

                // زر المهمة
                const button = document.createElement('button');
                button.classList.add('task-button');
                button.setAttribute('data-task-id', task.id);
                button.setAttribute('data-reward', task.reward);

                // تعيين نص الزر بناءً على حالة المهمة
                if (completedTasks.includes(task.id)) {
                    // علامة الصح
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    `;
                    button.disabled = true;
                } else {
                    // السهم
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="arrow">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    `;
                }

                taskElement.appendChild(button);
                taskContainer.appendChild(taskElement);

                // التعامل مع النقر على الزر
                let taskProgress = 0;

                button.addEventListener('click', () => {
                    if (taskProgress === 0) {
                        showLoading(button);
                        openTaskLink(task.url, () => {
                            taskProgress = 1;
                            hideLoading(button, 'Verify');
                        });
                    } else if (taskProgress === 1) {
                        showLoading(button);
                        setTimeout(() => {
                            taskProgress = 2;
                            hideLoading(button, 'Claim');
                        }, 5000);
                    } else if (taskProgress === 2) {
                        claimTaskReward(task.id, task.reward, button);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
});

// استلام المكافأة وتحديث قاعدة البيانات (Firebase)
async function claimTaskReward(taskId, reward, button) {
    try {
        // التحقق إذا كانت المهمة مكتملة مسبقًا
        const userId = uiElements.userTelegramIdDisplay.innerText;
        const userDocRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
            const completedTasks = userSnapshot.data()?.completed_tasks || [];
            if (completedTasks.includes(taskId)) {
                showNotification(uiElements.purchaseNotification, 'You have already claimed this reward.');
                return;
            }

            // إضافة المكافأة إلى الرصيد
            gameState.balance += reward;
            completedTasks.push(taskId);

            // تحديث واجهة المستخدم
            button.textContent = '✓';
            button.disabled = true;
            updateUI();
            showNotificationWithStatus(uiElements.purchaseNotification, `Successfully claimed ${reward} coins!`, 'win');

            // تحديث قاعدة البيانات في Firebase
            await updateDoc(userDocRef, {
                balance: gameState.balance,
                completed_tasks: completedTasks,
            });
            console.log('Task completed and data updated in Firebase');
        } else {
            console.error('User not found in Firebase');
        }
    } catch (error) {
        console.error('Error claiming task reward:', error);
    }
}

// عرض التحميل
function showLoading(button) {
    button.innerHTML = `<span class="loading-spinner"></span>`;
    button.disabled = true;
}

function hideLoading(button, text) {
    button.disabled = false;
    button.innerHTML = text;
}

// فتح رابط المهمة
function openTaskLink(taskurl, callback) {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.openLink(taskurl, { try_instant_view: true });
        setTimeout(callback, 1000);
    } else {
        window.open(taskurl, '_blank');
        setTimeout(callback, 1000);
    }
}





/////////////////////////////////////


function initializeTelegramIntegration() {
    const telegramApp = window.Telegram.WebApp;

    // التأكد من أن التطبيق جاهز
    telegramApp.ready();

    // تعريف الصفحات
    const mainPageId = "mainPage"; // الصفحة الرئيسية
    const defaultHeaderColor = "#000000"; // اللون الافتراضي (أسود)
    const mainPages = ["mainPage", "boostsPage", "tasksPage", "accountPage", "Puzzlespage"]; // الصفحات الرئيسية

    // تحديث زر الرجوع بناءً على الصفحة الحالية
    function updateBackButton() {
        const currentPage = document.querySelector(".screen-content.active");
        if (currentPage && !mainPages.includes(currentPage.id)) {
            telegramApp.BackButton.show(); // إظهار زر الرجوع في الصفحات الفرعية
        } else {
            telegramApp.BackButton.hide(); // إخفاء زر الرجوع في الصفحات الرئيسية
        }
    }

    // تحديث الزر النشط بناءً على الصفحة النشطة
    function updateActiveButton(targetPageId) {
        document.querySelectorAll(".menu button").forEach(btn => {
            const target = btn.getAttribute("data-target");
            btn.classList.toggle("active", target === targetPageId);
        });
    }

    // تحديث لون الهيدر بناءً على الصفحة
     function updateHeaderColor() {
          telegramApp.setHeaderColor(defaultHeaderColor); // اللون الافتراضي لجميع الصفحات
    }

    // التنقل إلى صفحة معينة
    function navigateToPage(targetPageId) {
        // إزالة الصفحة النشطة الحالية
        document.querySelectorAll(".screen-content").forEach(page => page.classList.remove("active"));

        // تفعيل الصفحة المستهدفة
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add("active");
        }

        // تحديث زر الرجوع والزر النشط ولون الهيدر
        updateBackButton();
        updateActiveButton(targetPageId);
        updateHeaderColor(); // تأكد من تحديث الهيدر بعد التفعيل
    }

    // تفعيل حدث زر الرجوع الخاص بـ Telegram
    telegramApp.BackButton.onClick(() => {
        const currentPage = document.querySelector(".screen-content.active");
        if (currentPage && !mainPages.includes(currentPage.id)) {
            navigateToPage(mainPageId); // العودة دائمًا إلى الصفحة الرئيسية من الصفحات الفرعية
        } else {
            telegramApp.close(); // إغلاق WebApp إذا كنت في الصفحة الرئيسية
        }
    });

    // إعداد التنقل بين الأقسام
    document.querySelectorAll("button[data-target]").forEach(button => {
        button.addEventListener("click", () => {
            const targetPageId = button.getAttribute("data-target");

            // تحديث التنقل
            navigateToPage(targetPageId);

            // تحديث سجل التنقل
            if (mainPages.includes(targetPageId)) {
                history.replaceState({ target: targetPageId }, "", `#${targetPageId}`);
            } else {
                history.pushState({ target: targetPageId }, "", `#${targetPageId}`);
            }
        });
    });

    // إدارة التنقل عند استخدام زر الرجوع في المتصفح
    window.addEventListener("popstate", (event) => {
        const targetPageId = event.state ? event.state.target : mainPageId;
        navigateToPage(targetPageId);
    });

    // تخصيص الألوان بناءً على الثيم
    if (telegramApp.colorScheme === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#000');
        document.documentElement.style.setProperty('--text-color', '#FFF');
    } else {
        document.documentElement.style.setProperty('--background-color', '#FFF');
        document.documentElement.style.setProperty('--text-color', '#000');
    }

    // فتح الصفحة الرئيسية عند تحميل التطبيق
    window.addEventListener("load", () => {
        const hash = window.location.hash.substring(1) || mainPageId;
        navigateToPage(hash);

        // تحديث لون الهيدر عند التحميل
        updateHeaderColor();

        // تحديث سجل التنقل
        history.replaceState({ target: hash }, "", `#${hash}`);
    });
}

// استدعاء التهيئة عند تحميل الصفحة
window.addEventListener("load", initializeTelegramIntegration);




///////////////////////////////


import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// تعريف عناصر DOM
const puzzlecloseModal = document.getElementById('puzzlecloseModal');
const puzzleCountdown = document.getElementById('puzzleCountdown');
const puzzleContainer = document.getElementById('puzzleContainer');
const openPuzzleBtn = document.getElementById('puzzle1');
const puzzleQuestion = document.getElementById('puzzleQuestion');
const puzzleOptions = document.getElementById('puzzleOptions');
const puzzleNotification = document.getElementById('puzzleNotification');
const puzzleHint = document.getElementById('puzzleHint');
const timerDisplay = document.getElementById('timer');
const remainingAttemptsDisplay = document.getElementById('attemptsDisplay');
const puzzleRewardDisplay = document.getElementById('puzzleRewardDisplay');

// تعريف حالة اللعبة
let currentPuzzle;
let attempts = 0;
let puzzleSolved = false;
let countdownInterval;
const maxAttempts = 3; // أقصى عدد للمحاولات
const countdownDuration = 24 * 60 * 60 * 1000; // 24 ساعة بالميلي ثانية

// تحميل الأحاجي من ملف JSON
async function loadPuzzles() {
    try {
        const response = await fetch('json/puzzles.json');
        if (!response.ok) throw new Error('Failed to load puzzles');
        const data = await response.json();
        return data.puzzles;
    } catch (error) {
        console.error(error);
        showNotificationWithStatus(puzzleNotification, 'Error loading puzzle. Please try again later.', 'lose');
    }
}

// اختيار أحجية اليوم بناءً على التاريخ
function getTodaysPuzzle(puzzles) {
    const today = new Date().toDateString();
    return puzzles.find(p => new Date(p.availableDate).toDateString() === today);
}

// عرض مؤقت العد التنازلي في العنصر المخصص
function startCountdownOnButton(seconds) {
    openPuzzleBtn.disabled = true;

    const countdownDisplay = document.getElementById('puzzleCountdown');
    countdownDisplay.innerText = ` ${formatTime(seconds)}`;

    const puzzleItem = document.getElementById('puzzle1'); // استهداف العنصر حسب ID
    puzzleItem.classList.add('inactive'); // إضافة الفئة "inactive" لتفعيل تأثير الضباب والتوهج

    function updateCountdown() {
        if (seconds > 0) {
            seconds--;
            countdownDisplay.innerText = ` ${formatTime(seconds)}`;
            setTimeout(updateCountdown, 1000);
        } else {
            countdownDisplay.innerText = 'Puzzle available now!';
            puzzleItem.classList.remove('inactive'); // إزالة الفئة "inactive"
            puzzleItem.classList.add('active'); // إضافة الفئة "active"
            openPuzzleBtn.disabled = false;
            openPuzzleBtn.innerText = 'Open Puzzle';
        }
    }

    updateCountdown();
}

// صياغة الوقت (الساعات:الدقائق:الثواني)
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// عرض أحجية اليوم إذا كانت متاحة
async function displayTodaysPuzzle() {
    const puzzles = await loadPuzzles();
    currentPuzzle = getTodaysPuzzle(puzzles);
    const userTelegramId = uiElements.userTelegramIdDisplay.innerText;

    // جلب تقدم المستخدم من Firebase
    const userDocRef = doc(db, "users", userTelegramId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        console.error('User not found in Firebase');
        return;
    }

    const puzzlesProgress = userSnapshot.data()?.puzzles_progress || {};
    const puzzleProgress = puzzlesProgress[currentPuzzle.id];

    const lastSolvedTime = puzzleProgress?.last_solved_time;
    if (lastSolvedTime) {
        const timeElapsed = Date.now() - new Date(lastSolvedTime).getTime();
        if (timeElapsed < countdownDuration) {
            const remainingSeconds = Math.floor((countdownDuration - timeElapsed) / 1000);
            startCountdownOnButton(remainingSeconds);
            return;
        }
    }

    puzzleQuestion.innerText = currentPuzzle.question;
    puzzleHint.innerText = `Hint : ${currentPuzzle.hint}`;
    puzzleRewardDisplay.innerText = `Reward ${currentPuzzle.reward} $S4W`;

    const optionsHtml = currentPuzzle.options.map(option => `<button class="option-btn">${option}</button>`).join('');
    puzzleOptions.innerHTML = optionsHtml;

    puzzleContainer.classList.remove('hidden');
    updateRemainingAttempts(puzzleProgress?.attempts || 0);
    startCountdown();
}

// تشغيل المؤقت
function startCountdown() {
    let timeLeft = 60.00;
    timerDisplay.innerText = timeLeft.toFixed(2);

    countdownInterval = setInterval(() => {
        timeLeft -= 0.01;
        timerDisplay.innerText = timeLeft.toFixed(2);

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            handlePuzzleTimeout();
        }
    }, 10);
}

// التعامل مع انتهاء الوقت
function handlePuzzleTimeout() {
    clearInterval(countdownInterval);
    showNotification(puzzleNotification, "Time's up! You failed to solve the puzzle.");
    updatePuzzleProgressInDatabase(currentPuzzle.id, false, maxAttempts); // تحديث التقدم
    startCountdownOnButton(24 * 60 * 60); // بدء العد التنازلي لعرض أحجية اليوم التالي
    closePuzzle();
}

// التحقق من إجابة المستخدم
function checkPuzzleAnswer(selectedOption) {
    const userAnswer = selectedOption.innerText.trim();

    if (attempts >= maxAttempts || puzzleSolved) {
        showNotification(puzzleNotification, 'You have already solved or failed today\'s puzzle.');
        return;
    }

    if (userAnswer === currentPuzzle.answer) {
        handlePuzzleSuccess();
    } else {
        handlePuzzleWrongAnswer();
    }
}

// التعامل مع الإجابة الصحيحة
function handlePuzzleSuccess() {
    clearInterval(countdownInterval);

    const puzzleReward = currentPuzzle.reward;
    showNotificationWithStatus(puzzleNotification, `Correct! You've earned ${puzzleReward} coins.`, 'win');
    updateBalance(puzzleReward);

    updatePuzzleProgressInDatabase(currentPuzzle.id, true, attempts); // تحديث التقدم في قاعدة البيانات

    puzzleSolved = true;
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    startCountdownOnButton(24 * 60 * 60); // بدء العد التنازلي لعرض أحجية اليوم التالي
}

// التعامل مع الإجابة الخاطئة
function handlePuzzleWrongAnswer() {
    attempts++;
    updateRemainingAttempts(attempts);

    if (attempts === maxAttempts) {
        clearInterval(countdownInterval);
        showNotification(puzzleNotification, 'You have used all attempts. 500 $S4W have been deducted.');
        updatePuzzleProgressInDatabase(currentPuzzle.id, false, maxAttempts); // تسجيل المحاولة الفاشلة
        startCountdownOnButton(24 * 60 * 60); // بدء العد التنازلي
        closePuzzle();
    } else {
        showNotification(puzzleNotification, `Wrong answer. You have ${maxAttempts - attempts} attempts remaining.`);
    }
}

// تحديث تقدم الأحجية في قاعدة البيانات
async function updatePuzzleProgressInDatabase(puzzleId, solved, attempts) {
    const userTelegramId = uiElements.userTelegramIdDisplay.innerText;

    const userDocRef = doc(db, "users", userTelegramId);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        console.error('User not found in Firebase');
        return;
    }

    let puzzlesProgress = userSnapshot.data()?.puzzles_progress || {};

    puzzlesProgress[puzzleId] = {
        solved: solved,
        attempts: attempts,
        last_solved_time: solved ? new Date().toISOString() : null
    };

    await updateDoc(userDocRef, { puzzles_progress: puzzlesProgress });
    console.log('Puzzle progress updated in Firebase');
}

// تحديث عرض المحاولات المتبقية
function updateRemainingAttempts(attempts = 0) {
    remainingAttemptsDisplay.innerText = `${maxAttempts - attempts}/${maxAttempts}`;
}

// تحديث الرصيد
function updateBalance(amount) {
    gameState.balance += amount;
    updateUI(); // تحديث الواجهة
    saveGameState(); // حفظ حالة اللعبة
}

// إغلاق الأحجية
function closePuzzle() {
    clearInterval(countdownInterval);
    puzzleContainer.classList.add('hidden');
    puzzleOptions.innerHTML = '';
    puzzleNotification.innerText = '';
    attempts = 0;
    puzzleSolved = false;
}



///////////////////////////////////////////////////



/////////////////////////////////////////////////



const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://sawcoin.vercel.app/json/tonconnect-manifest.json',
    buttonRootId: 'ton-connect'
});

async function connectToWallet() {
    const connectedWallet = await tonConnectUI.connectWallet();
    // يمكنك تنفيذ بعض العمليات باستخدام connectedWallet إذا لزم الأمر
    console.log(connectedWallet);
}

async function checkConnection() {
    try {
        const isConnected = await tonConnectUI.isWalletConnected();
        
        if (!isConnected) {
            // إذا لم يتم الربط، أظهر واجهة الربط
            await connectToWallet();
        } else {
            console.log("Wallet is already connected.");
        }
    } catch (error) {
        console.error("Error checking wallet connection:", error);
    }
}

// استدعاء دالة التحقق عند تحميل الصفحة
checkConnection();

tonConnectUI.uiOptions = {
    twaReturnUrl: 'https://t.me/SAWCOIN_BOT/GAME'
};


//////////////////////////////////////////////////



document.addEventListener("DOMContentLoaded", function () {
    let coinCounter = 0;
    let autoIncrementInterval;

    function startGame(gameUrl) {
        const gameFrameContainer = document.getElementById("gameFrameContainer");
        const gameFrame = document.getElementById("gameFrame");
        const counterDisplay = document.getElementById("counterDisplay");
        const counterContainer = document.querySelector(".counter-container");

        if (gameFrameContainer && gameFrame && counterContainer) {
            gameFrame.src = gameUrl;
            gameFrameContainer.style.display = "flex";
            counterContainer.style.display = "flex";
            coinCounter = 0;
            counterDisplay.innerText = coinCounter;

            
            // بدء زيادة العداد تلقائيًا بمقدار 0.2 عملة كل ثانية
            autoIncrementInterval = setInterval(() => {
                coinCounter += 0.1;
                counterDisplay.innerText = coinCounter.toFixed(1); // عرض الرقم بفاصلة عشرية واحدة
                gameState.balance += 0.1;
                updateUI();
                saveGameState();
            }, 4000); // كل ثانية يتم زيادة 0.2 عملة
        }
    }
    
    function closeGameElements() {
        const gameFrameContainer = document.getElementById("gameFrameContainer");
        const gameFrame = document.getElementById("gameFrame");
        const counterContainer = document.querySelector(".counter-container");

        if (gameFrameContainer && gameFrame && counterContainer) {
            // إخفاء جميع العناصر الخاصة باللعبة باستثناء صفحة الألعاب
            gameFrameContainer.style.display = "none";
            gameFrame.src = ""; // إزالة مصدر اللعبة لإيقافها
            counterContainer.style.display = "none";

            // إيقاف الزيادة التلقائية عند إغلاق العناصر
            clearInterval(autoIncrementInterval);
        }
    }

    function claimCoins() {
        gameState.balance += coinCounter;
        updateUI(); // تحديث واجهة المستخدم
        showNotificationWithStatus(uiElements.purchaseNotification, `You've claimed ${coinCounter} coins!`, 'win');
        saveGameState();
        closeGameElements(); // إخفاء العناصر بعد الجمع
    }

    // إضافة مستمع زر الإغلاق
    document.getElementById("closeGamePage").addEventListener("click", closeGameElements);

    // تعيين الدوال في النطاق العام
    window.startGame = startGame;
    window.closeGamePage = closeGameElements;
    window.claimCoins = claimCoins;
});



/////////////////////////////////////////



document.addEventListener('DOMContentLoaded', function() {
    // تأكد من تعريف المتغير THEME 
    const THEME = TonConnectUi.THEME;

    // تهيئة واجهة Ton Connect UI مع التخصيصات
    const tonConnectUI = new TonConnectUi.TonConnectUI({
        uiPreferences: {
            theme: THEME.DARK,
            borderRadius: 's',
            colorsSet: {
                [THEME.DARK]: {
                    connectButton: {
                        background: '#000000'  // لون خلفية الزر في الثيم الداكن
                    }
                },
                [THEME.LIGHT]: {
                    text: {
                        primary: '#FF0000'   // لون النص في الثيم الفاتح
                    }
                }
            }
        }
    });

    // ربط واجهة Ton Connect UI بالعنصر المحدد
    tonConnectUI.render('#ton-connect');
});


//////////////////////////////////////////

//تحديثات الاعدادات

function updateAccountSummary() {
  // تحديث العناصر الأساسية
  const invitedCountElement = document.getElementById('invitedCount');
  const currentLevelNameElement = document.getElementById('currentLevelName');

  // تحديث النسخ داخل لوحة الإعدادات
  const settingsInvitedCount = document.getElementById('settingsInvitedCount');
  const settingsCurrentLevelName = document.getElementById('settingsCurrentLevelName');

  const currentLevelIndex = gameState.currentLevel - 1;
  const currentLevelName = levelThresholds[currentLevelIndex]?.name || 'Unknown';

  if (invitedCountElement) invitedCountElement.innerText = gameState.invites.length;
  if (currentLevelNameElement) currentLevelNameElement.innerText = currentLevelName;

  // تحديث النسخ في لوحة الإعدادات
  if (settingsInvitedCount) settingsInvitedCount.innerText = gameState.invites.length;
  if (settingsCurrentLevelName) settingsCurrentLevelName.innerText = currentLevelName;
}

document.addEventListener('DOMContentLoaded', () => {
  loadGameState();
  updateAccountSummary();
});



///////////////////////////////////////////




import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// استماع للنقر على زر تطبيق البرومو كود
document.getElementById('applyPromoCode').addEventListener('click', async () => {
    const applyButton = document.getElementById('applyPromoCode');
    const promoCodeInput = document.getElementById('promoCodeInput');
    const enteredCode = promoCodeInput.value;

    // إخفاء نص الزر وعرض دائرة تحميل
    applyButton.innerHTML = '';  // إخفاء النص
    applyButton.classList.add('loading');  // إضافة الكلاس loading لعرض دائرة التحميل

    // إنشاء دائرة التحميل
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    applyButton.appendChild(spinner);

    try {
        // تحميل البرومو كود من ملف JSON
        const response = await fetch('json/promocodes.json');
        const promoData = await response.json();
        const promoCodes = promoData.promoCodes;

        // تحقق مما إذا كان المستخدم قد استخدم هذا البرومو كود من قاعدة البيانات
        const alreadyUsed = await checkIfPromoCodeUsed(enteredCode);

        if (alreadyUsed) {
            applyButton.innerHTML = '⛔';
            showNotificationWithStatus(uiElements.purchaseNotification, 'You have already used this promo code.', 'win');
            setTimeout(() => {
                applyButton.innerHTML = 'Apply';
                applyButton.classList.remove('loading');
                spinner.remove();
            }, 3000);
            return;
        }

        // التحقق مما إذا كان البرومو كود صحيحًا
        if (promoCodes[enteredCode]) {
            const reward = promoCodes[enteredCode];

            // إضافة المكافأة إلى رصيد المستخدم
            gameState.balance += reward;

            // تحديث واجهة المستخدم
            updateUI(); 

            // حفظ البرومو كود المستخدم في قاعدة البيانات
            const updated = await addPromoCodeToUsed(enteredCode);
            if (!updated) {
                showNotification(uiElements.purchaseNotification, 'Failed to save promo code in database.', true);
                return;
            }

            // عرض علامة صح (✔️) عند النجاح
            applyButton.innerHTML = '✔️';

            // إظهار إشعار بالمكافأة
            showNotificationWithStatus(uiElements.purchaseNotification, `Successfully added ${reward} coins to your balance!`, 'win');

            // حفظ الحالة الحالية للعبة وتحديثها في قاعدة البيانات
            saveGameState();  // حفظ الحالة الحالية
            await updateGameStateInDatabase({
                used_Promo_Codes: gameState.usedPromoCodes,
                balance: gameState.balance,
            });

        } else {
            // عرض علامة خطأ (❌) عند البرومو كود غير صحيح
            applyButton.innerHTML = '❌';

            // إظهار إشعار بالخطأ
            showNotificationWithStatus(uiElements.purchaseNotification, 'Invalid promo code.', 'lose');
        }
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        applyButton.innerHTML = 'Error';
    } finally {
        // إعادة النص العادي للزر بعد 3 ثواني
        setTimeout(() => {
            applyButton.innerHTML = 'Apply';
            applyButton.classList.remove('loading');
            spinner.remove();
        }, 3000);
    }
});

// دالة للتحقق من البرومو كود المستخدم من قاعدة البيانات
async function checkIfPromoCodeUsed(enteredCode) {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        console.error('User not found in Firebase');
        return false;
    }

    const usedPromoCodes = userSnapshot.data().used_Promo_Codes || [];
    return usedPromoCodes.includes(enteredCode);
}

// دالة لإضافة البرومو كود إلى الأكواد المستخدمة
async function addPromoCodeToUsed(enteredCode) {
    const userId = uiElements.userTelegramIdDisplay.innerText;
    const userDocRef = doc(db, "users", userId);

    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        console.error('User not found in Firebase');
        return false;
    }

    let usedPromoCodes = userSnapshot.data().used_Promo_Codes || [];
    usedPromoCodes.push(enteredCode);

    try {
        await updateDoc(userDocRef, {
            used_Promo_Codes: usedPromoCodes
        });
        console.log('Promo code added to used list successfully.');
        return true;
    } catch (error) {
        console.error('Error updating used promo codes:', error);
        return false;
    }
}

// استماع لفتح نافذة البرومو كود
document.getElementById('promocodeBtu').addEventListener('click', function() {
    document.getElementById('promoContainer').classList.remove('hidden');
});

// إغلاق النافذة عند النقر على زر الإغلاق
document.getElementById('promocloseModal').addEventListener('click', () => {
    document.getElementById('promoContainer').classList.add('hidden');
});


    


/////////////////////////////////////////




/////////////////////////////////////////




//////////////////////////////////////


// استلام رابط الدعوة عند الانضمام
function handleInvite() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrerId = urlParams.get('start');  // استلام معرف الداعي من الرابط
    const currentUserId = window.Telegram.WebApp.user.id; // استلام معرف المستخدم الحالي

    if (referrerId && referrerId !== currentUserId) {
        // منح مكافأة للداعي والمدعو
        rewardReferral(referrerId, currentUserId);
    }
}

// منح المكافأة
function rewardReferral(referrerId, invitedId) {
    // أضف 5000 عملة لكلا الطرفين في قاعدة البيانات أو حسب الحالة
    // هذا مثال على العملية في واجهة المستخدم
    gameState.balance += 5000;  // مكافأة للمدعو
    updateUI();
    showNotification(uiElements.purchaseNotification, 'You received 5,000 coins from your friend!');
    
    // مكافأة للداعي
    // يمكن إرسال مكافأة للداعي أيضًا هنا
    gameState.balance += 5000;  // مكافأة للداعي
    updateUserData();
    saveGameState();
    
    // إرسال إشعار للطرفين
    showNotificationWithStatus(uiElements.purchaseNotification, `You received 5,000 coins for inviting a friend!`);
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', handleInvite);



//////////////////////////////////////////////////////////




////////////////////////////////////////////////






document.addEventListener('DOMContentLoaded', () => {
    // عناصر DOM الضرورية
    const dailyButton = document.getElementById('daily2');
    const dailyCloseModal = document.getElementById('logindailycloseModal');
    const logindailyContainer = document.getElementById('logindailyContainer');
    const logindailyContent = document.querySelector('.logindaily-content');
    const loginClaimBtn = document.getElementById('loginclaimBtn');
    const loginNotification = document.getElementById('login');
    const dayElements = document.querySelectorAll('.daily-item');
    const rewardImages = document.querySelectorAll('.reward-image'); // صور المكافآت
    const dailyRewards = [100, 500, 2000, 5000, 8000, 15000, 30000, 50000, 100000]; // المكافآت

    // تحديث حساب الأيام المتتالية بناءً على تاريخ اليوم
    async function handleDailyLogin() {
        try {
            const userTelegramId = uiElements.userTelegramIdDisplay.innerText;

            // جلب بيانات المستخدم من Firebase
            const userDocRef = doc(db, "users", userTelegramId);
            const userSnapshot = await getDoc(userDocRef);

            if (!userSnapshot.exists()) {
                console.error('User data not found.');
                loginNotification.innerText = 'Error loading daily login. Please try again later.';
                return;
            }

            let { last_login_date, consecutive_days } = userSnapshot.data();
            consecutive_days = consecutive_days || 0;
            const today = new Date().toISOString().split('T')[0]; // تاريخ اليوم فقط (YYYY-MM-DD)

            // التحقق من حالة تسجيل الدخول اليومي
            if (last_login_date === today) {
                loginNotification.innerText = 'You have already claimed today\'s reward.';
                disableClaimButton();
                highlightRewardedDays(consecutive_days);
                showRewardImage(consecutive_days);
                return;
            }

            // التحقق من استمرارية الأيام المتتالية
            const lastLoginDateObj = new Date(last_login_date);
            const isConsecutive = (new Date(today).getDate() - lastLoginDateObj.getDate()) === 1 &&
                new Date(today).getMonth() === lastLoginDateObj.getMonth() &&
                new Date(today).getFullYear() === lastLoginDateObj.getFullYear();

            if (isConsecutive) {
                consecutive_days++;
                if (consecutive_days > dailyRewards.length) consecutive_days = dailyRewards.length;
            } else {
                consecutive_days = 1; // إعادة تعيين إلى اليوم الأول إذا فات المستخدم يوم
            }

            // إضافة المكافأة للمستخدم بناءً على عدد الأيام المتتالية
            const reward = dailyRewards[consecutive_days - 1];
            updateBalance(reward);

            // تحديث واجهة المستخدم
            loginNotification.innerText = `Day ${consecutive_days}: You've earned ${reward} $S4W!`;
            updateClaimButton(consecutive_days, reward);
            highlightRewardedDays(consecutive_days);

            // تحديث قاعدة البيانات
            await updateDoc(userDocRef, {
                last_login_date: today,
                consecutive_days: consecutive_days
            });

            console.log('Database updated successfully');
        } catch (error) {
            console.error('Unexpected error in daily login:', error);
            loginNotification.innerText = 'Error processing your daily login. Please try again later.';
        }
    }

    // تحديث زر المطالبة بالمكافأة
    function updateClaimButton(day, reward) {
        loginClaimBtn.innerText = `Day ${day} : ${reward} $S4W`;
        loginClaimBtn.disabled = false;
        loginClaimBtn.classList.remove('disabled');
    }

    // تعطيل الزر بعد المطالبة بالمكافأة
    function disableClaimButton() {
        loginClaimBtn.disabled = true;
        loginClaimBtn.classList.add('disabled');
    }

    // تحديث واجهة الأيام المتتالية
    function highlightRewardedDays(dayCount) {
        dayElements.forEach((el, index) => {
            if (index < dayCount) {
                el.classList.add('claimed');
                el.style.filter = 'blur(2px)';
            } else {
                el.classList.remove('claimed');
                el.style.filter = 'none';
            }
        });
    }

    // عرض الصورة الخاصة بكل يوم بعد المطالبة
    function showRewardImage(day) {
        rewardImages.forEach((img, index) => {
            if (index === day - 1) {
                img.src = 'i/done.png'; // تحديث مصدر الصورة
                img.classList.remove('hidden'); // إظهار الصورة
            } else {
                img.classList.add('hidden'); // إخفاء الصور الأخرى
            }
        });
    }

    // تحديث الرصيد
    function updateBalance(amount) {
        gameState.balance += amount;
        updateUI(); // تحديث واجهة المستخدم
        saveGameState(); 
        updateGameStateInDatabase();
    }

    // فتح نافذة تسجيل الدخول اليومي
    function openDailyLoginModal(userTelegramId) {
        logindailyContainer.classList.remove('hidden');
        logindailyContent.classList.remove('hidden');
        handleDailyLogin();
    }

    // إغلاق نافذة تسجيل الدخول اليومي
    dailyCloseModal.addEventListener('click', function () {
        logindailyContainer.classList.add('hidden');
        logindailyContent.classList.add('hidden');
    });

    // عند الضغط على زر المطالبة بالمكافأة
    loginClaimBtn.addEventListener('click', async function () {
        await handleDailyLogin();
        disableClaimButton();
    });

    // فتح النافذة عند دخول المستخدم
    dailyButton.addEventListener('click', function () {
        openDailyLoginModal(userTelegramId);  // تأكد من تمرير userTelegramId هنا
    });
});

///////////////////////////////////////



async function showUpgradeModal(upgradeType) {
    if (!uiElements.upgradeModal) return;

    uiElements.upgradeModal.style.display = 'block';
    uiElements.upgradeModal.setAttribute('data-upgrade-type', upgradeType);

    const upgrades = {
        boost: {
            cost: gameState.boostLevel * 500 + 500,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-boosts">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
                    <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
                    <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
                    <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
                    <path d="M5 3l-1 -1" />
                    <path d="M4 7h-1" />
                    <path d="M14 3l1 -1" />
                    <path d="M15 6h1" />
                </svg>
            `,
            title: "Hand Clicks",
            current: `Current Click Multiplier: ×${gameState.clickMultiplier}`,
        },
        coin: {
            cost: gameState.coinBoostLevel * 500 + 500,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon-boosts">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
                </svg>
            `,
            title: "Energy Limits",
            current: `Max Coins: ${formatNumber(gameState.maxEnergy)}`,
        },
    };

    const upgrade = upgrades[upgradeType];
    if (!upgrade) return;

    document.getElementById('upgradeIconContainer').innerHTML = upgrade.icon;
    document.getElementById('upgradeTitle').innerText = upgrade.title;
    document.getElementById('currentLevel').innerText = upgrade.current;
    document.getElementById('upgradeCost').innerText = `Cost: ${upgrade.cost}`;
}

document.getElementById('bost1').addEventListener('click', () => showUpgradeModal('boost'));
document.getElementById('bost2').addEventListener('click', () => showUpgradeModal('coin'));

// إغلاق النافذة المنبثقة
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('upgradeConfirmation').style.display = 'none';
});

function confirmUpgradeAction() {
    const upgradeType = uiElements.upgradeModal.getAttribute('data-upgrade-type');
    let cost;

    if (upgradeType === 'boost') {
        cost = gameState.boostLevel * 500 + 500;
        if (gameState.balance >= cost) {
            gameState.balance -= cost;
            gameState.boostLevel++;
            gameState.clickMultiplier += 1;

            // عرض إشعار بالترقية
            showNotification(purchaseNotification, `Upgraded successfully ${upgrades.boost.title}`);
        } else {
            // عرض إشعار بعدم كفاية الرصيد
            showNotification(purchaseNotification, 'You dont have enough coins to upgrade');
        }
    } else if (upgradeType === 'coin') {
        cost = gameState.coinBoostLevel * 500 + 500;
        if (gameState.balance >= cost) {
            gameState.balance -= cost;
            gameState.coinBoostLevel++;
            gameState.maxEnergy += 500;

            // عرض إشعار بالترقية
             showNotification(purchaseNotification, `Upgraded successfully ${upgrades.coin.title}`);
        } else {
            // عرض إشعار بعدم كفاية الرصيد
            showNotification(purchaseNotification, ' You dont have enough coins to upgrade');
        }
    }

    saveUpgradeState(upgradeType); // حفظ الترقية
    updateUI();
    uiElements.upgradeModal.style.display = 'none';
}



function updateBoostsDisplay() {
    if (!uiElements) return;

    const boostUpgradeCost = gameState.boostLevel * 500 + 500;
    const coinUpgradeCost = gameState.coinBoostLevel * 500 + 500;

    document.getElementById('boostUpgradeCost').innerText = boostUpgradeCost;
    document.getElementById('clickMultiplier').innerText = gameState.boostLevel;

    document.getElementById('coinUpgradeCost').innerText = coinUpgradeCost;
    document.getElementById('coinBoostLevel').innerText = gameState.coinBoostLevel;
}


function saveUpgradeState(upgradeType) {
    const upgradeState = {
        boostLevel: gameState.boostLevel,
        coinBoostLevel: gameState.coinBoostLevel,
        clickMultiplier: gameState.clickMultiplier,
        maxEnergy: gameState.maxEnergy,
    };

    localStorage.setItem('upgradeState', JSON.stringify(upgradeState));
}

function loadUpgradeState() {
    const savedState = localStorage.getItem('upgradeState');
    if (savedState) {
        const upgradeState = JSON.parse(savedState);
        gameState.boostLevel = upgradeState.boostLevel;
        gameState.coinBoostLevel = upgradeState.coinBoostLevel;
        gameState.clickMultiplier = upgradeState.clickMultiplier;
        gameState.maxEnergy = upgradeState.maxEnergy;
    }
}

window.addEventListener('load', () => {
    loadUpgradeState();
  //  updateBoostsDisplay();
});



//////////////////////////////////////





// تفعيل التطبيق
initializeApp();


//localStorage.removeItem('gameState'); // مسح حالة اللعبة
//loadGameState(); // إعادة تحميل حالة اللعبة

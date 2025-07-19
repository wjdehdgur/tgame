// 📄 backend-node/public/script.js

// 전역 변수
let resources = [];

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    loadResources();
    setInterval(loadResources, 5000); // 5초마다 자원 정보 업데이트
});

// 자원 목록 로드
async function loadResources() {
    try {
        const response = await fetch('/api/resources');
        const data = await response.json();
        
        if (data.success) {
            resources = data.resources;
            displayResources();
            updateResourceSelects();
        } else {
            addLog('자원 로드 실패', 'error');
        }
    } catch (error) {
        addLog('서버 연결 오류: ' + error.message, 'error');
    }
}

// 자원 목록 표시
function displayResources() {
    const container = document.getElementById('resources-list');
    container.innerHTML = '';

    resources.forEach(resource => {
        const card = createResourceCard(resource);
        container.appendChild(card);
    });
}

// 자원 카드 생성
function createResourceCard(resource) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    
    const percentage = (resource.amount / resource.maxStorage) * 100;
    const progressClass = percentage > 80 ? 'danger' : percentage > 60 ? 'warning' : '';
    
    card.innerHTML = `
        <div class="resource-name">${resource.name}</div>
        <div class="resource-type">${resource.type}</div>
        <div class="resource-amount">${resource.amount.toLocaleString()}</div>
        <div class="resource-max">/ ${resource.maxStorage.toLocaleString()}</div>
        <div class="progress-bar">
            <div class="progress-fill ${progressClass}" style="width: ${percentage}%"></div>
        </div>
    `;
    
    return card;
}

// 자원 선택 드롭다운 업데이트
function updateResourceSelects() {
    const selects = ['produce-resource', 'use-resource', 'capacity-resource'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        const currentValue = select.value;
        
        select.innerHTML = '<option value="">자원 선택</option>';
        resources.forEach(resource => {
            const option = document.createElement('option');
            option.value = resource.name;
            option.textContent = resource.name;
            select.appendChild(option);
        });
        
        select.value = currentValue;
    });
}

// 자원 생산
async function produceResource() {
    const resourceName = document.getElementById('produce-resource').value;
    const amount = parseInt(document.getElementById('produce-amount').value);
    
    if (!resourceName || !amount || amount <= 0) {
        addLog('올바른 자원과 생산량을 입력하세요', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/resources/produce', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: resourceName, amount: amount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog(`${resourceName} ${amount}개 생산 완료!`, 'success');
            loadResources(); // 자원 목록 새로고침
        } else {
            addLog('생산 실패: ' + (data.message || '알 수 없는 오류'), 'error');
        }
    } catch (error) {
        addLog('생산 요청 실패: ' + error.message, 'error');
    }
}

// 자원 소비
async function useResource() {
    const resourceName = document.getElementById('use-resource').value;
    const amount = parseInt(document.getElementById('use-amount').value);
    
    if (!resourceName || !amount || amount <= 0) {
        addLog('올바른 자원과 소비량을 입력하세요', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/resources/use', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: resourceName, amount: amount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog(`${resourceName} ${amount}개 소비 완료!`, 'success');
            loadResources(); // 자원 목록 새로고침
        } else {
            addLog('소비 실패: ' + (data.message || '알 수 없는 오류'), 'error');
        }
    } catch (error) {
        addLog('소비 요청 실패: ' + error.message, 'error');
    }
}

// 저장량 증가
async function increaseCapacity() {
    const resourceName = document.getElementById('capacity-resource').value;
    const amount = parseInt(document.getElementById('capacity-amount').value);
    
    if (!resourceName || !amount || amount <= 0) {
        addLog('올바른 자원과 증가량을 입력하세요', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/resources/increase-capacity', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: resourceName, amount: amount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog(`${resourceName} 저장량 ${amount} 증가!`, 'success');
            loadResources(); // 자원 목록 새로고침
        } else {
            addLog('저장량 증가 실패: ' + (data.message || '알 수 없는 오류'), 'error');
        }
    } catch (error) {
        addLog('저장량 증가 요청 실패: ' + error.message, 'error');
    }
}

// 저장량 감소
async function decreaseCapacity() {
    const resourceName = document.getElementById('capacity-resource').value;
    const amount = parseInt(document.getElementById('capacity-amount').value);
    
    if (!resourceName || !amount || amount <= 0) {
        addLog('올바른 자원과 감소량을 입력하세요', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/resources/decrease-capacity', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: resourceName, amount: amount })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addLog(`${resourceName} 저장량 ${amount} 감소!`, 'success');
            loadResources(); // 자원 목록 새로고침
        } else {
            addLog('저장량 감소 실패: ' + (data.message || '알 수 없는 오류'), 'error');
        }
    } catch (error) {
        addLog('저장량 감소 요청 실패: ' + error.message, 'error');
    }
}

// 로그 추가
function addLog(message, type = 'info') {
    const container = document.getElementById('log-container');
    const logEntry = document.createElement('p');
    logEntry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.textContent = `[${timestamp}] ${message}`;
    
    container.appendChild(logEntry);
    container.scrollTop = container.scrollHeight; // 자동 스크롤
    
    // 로그가 너무 많으면 오래된 것 삭제
    const entries = container.querySelectorAll('.log-entry');
    if (entries.length > 50) {
        entries[0].remove();
    }
}

// 로그 지우기
function clearLog() {
    const container = document.getElementById('log-container');
    container.innerHTML = '<p class="log-entry">로그가 지워졌습니다.</p>';
}

// 키보드 단축키
document.addEventListener('keydown', function(event) {
    // Enter 키로 자원 생산
    if (event.key === 'Enter' && document.activeElement.id === 'produce-amount') {
        produceResource();
    }
    
    // Ctrl + Enter로 자원 소비
    if (event.key === 'Enter' && event.ctrlKey && document.activeElement.id === 'use-amount') {
        useResource();
    }
});

// 입력 필드 자동완성
document.getElementById('produce-amount').addEventListener('input', function() {
    const value = this.value;
    if (value && !isNaN(value)) {
        this.style.borderColor = '#48bb78';
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});

document.getElementById('use-amount').addEventListener('input', function() {
    const value = this.value;
    if (value && !isNaN(value)) {
        this.style.borderColor = '#f56565';
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});

// 페이지 새로고침 시 로그 추가
addLog('자원 관리 시스템이 로드되었습니다.', 'info'); 
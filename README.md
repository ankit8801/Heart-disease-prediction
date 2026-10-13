# Installation

## 1. Clone the repository

```powershell
git clone <repository-url>
cd Heart-disease-prediction
```

## 2. Install backend dependencies

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
cd ..
```

## 3. Install frontend dependencies

```powershell
cd frontend
npm install
cd ..
```

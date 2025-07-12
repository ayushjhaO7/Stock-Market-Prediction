
# Notebook Quality Report: EDA and Feature Engineering

## Overview

This report summarizes the documentation quality of the following Jupyter notebooks:
- `EDA.ipynb`
- `FE.ipynb`

We evaluated the presence of **Markdown cells** and **inline comments** in code cells, which are essential for understanding, collaboration, and reproducibility.

---

## 1. EDA Notebook (`EDA.ipynb`)

- **Markdown Cells**: ✅ 11 found  
- **Code Comments**: ❌ 0 found

📌 *Note:* While the Markdown coverage is good, adding inline comments inside code blocks would further enhance clarity.

---

## 2. Feature Engineering Notebook (`FE.ipynb`)

- **Markdown Cells**: ⚠️ Only 2 found  
- **Code Comments**: ❌ 0 found

📌 *Note:* This notebook would benefit from more Markdown explanation and inline comments, especially to clarify feature generation logic.

---

## Recommendations

- Add **inline comments** in code cells for step-by-step clarity.
- Expand **Markdown documentation** in `FE.ipynb` to explain:
  - What features are being created and why.
  - How they will be used downstream (e.g., for modeling).

---

## Sample Comment Improvement

```python
# Calculate 10-day moving average of the 'Close' price
df['MA10'] = df['Close'].rolling(window=10).mean()
```

---

✅ Well-documented notebooks help others understand your work and make collaboration easier.

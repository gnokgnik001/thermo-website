// ─────────────────────────────────────────────────────────────
// ตัวส่งฟอร์มสมัครงาน (แนบไฟล์ resume PDF) → /sendresume.php
// ใช้ FormData เพื่อแนบไฟล์ได้ (ห้ามตั้ง Content-Type เอง เบราว์เซอร์จัดการ boundary ให้)
// ลองส่งซ้ำเฉพาะตอนที่ "รู้แน่ว่ายังไม่ได้ส่ง" (network error / 5xx = cold start) กันใบสมัครซ้ำ
// ─────────────────────────────────────────────────────────────

export interface ApplicationResult {
  ok: boolean;
  error?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendApplication(
  formData: FormData,
  lang: 'th' | 'en'
): Promise<ApplicationResult> {
  const genericError =
    lang === 'th'
      ? 'เกิดข้อผิดพลาด กรุณาลองใหม่ หรือส่งอีเมลมาที่ info@thermothailand.com'
      : 'An error occurred. Please try again or email info@thermothailand.com';

  for (let tryIndex = 0; tryIndex < 2; tryIndex++) {
    try {
      const response = await fetch('/sendresume.php', {
        method: 'POST',
        body: formData, // อย่าตั้ง headers Content-Type เอง
      });

      // 5xx = เซิร์ฟเวอร์รับแล้วแต่ประมวลผลไม่ทัน (cold start) → ยังไม่ได้ส่งเมลแน่นอน ลองซ้ำได้
      if (response.status >= 500 && tryIndex === 0) {
        await sleep(1500);
        continue;
      }

      if (!response.ok) {
        return { ok: false, error: genericError };
      }

      const data = await response.json();
      if (data.ok === true) {
        return { ok: true };
      }
      // php ตอบ error (เช่น ไฟล์ไม่ใช่ PDF, กรอกไม่ครบ) — แสดงข้อความจาก php ตรงๆ ไม่ลองซ้ำ
      return { ok: false, error: data.error || genericError };
    } catch (e) {
      // network error = เชื่อมต่อไม่ถึงเลย → ยังไม่ได้ส่ง ลองซ้ำได้ครั้งเดียว
      if (tryIndex === 0) {
        await sleep(1500);
        continue;
      }
      return { ok: false, error: genericError };
    }
  }
  return { ok: false, error: genericError };
}

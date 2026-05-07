import { useEffect, useState } from "react";
import HexLines from "../components/HexLines.jsx";
import ReadingDisplay from "./ReadingDisplay.jsx";
import { getHex, hexName } from "../domain/trigrams.js";
import { isStorageAvailable, listReadings, deleteReading } from "../storage/local.js";

export default function HistoryView({ t, lang }) {
  const [readings, setReadings] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const labels = ({
    vi: { title: "Quẻ đã lưu", empty: "Chưa có quẻ nào được lưu. Hãy dựng một quẻ ở mục Bốc quẻ.", confirmDel: "Xóa?", clearAll: "Xóa hết", confirmAll: "Xóa tất cả?", loading: "Đang tải...", back: "Danh sách", anonQ: "(không có câu hỏi)", noStorageT: "Bộ nhớ không khả dụng", noStorageB: "Trình duyệt đã chặn localStorage (chế độ riêng tư hoặc cài đặt cookie). Quẻ sẽ không được giữ lại sau khi đóng. Khi bộ nhớ hoạt động trở lại, các quẻ đã lưu sẽ tự hiện ở đây." },
    en: { title: "Saved readings", empty: "No saved readings yet. Cast one in the Cast tab.", confirmDel: "Delete?", clearAll: "Clear all", confirmAll: "Delete all?", loading: "Loading...", back: "List", anonQ: "(no question)", noStorageT: "Storage unavailable", noStorageB: "The browser is blocking localStorage (private mode or cookie settings). Readings can't be kept across sessions right now. When storage comes back, your saved readings will appear here automatically." },
    zh: { title: "已存卦", empty: "暫無已存。請於起卦處起一卦。", confirmDel: "刪?", clearAll: "全部清空", confirmAll: "全部刪除?", loading: "載入中…", back: "列表", anonQ: "(無問)", noStorageT: "存儲不可用", noStorageB: "瀏覽器封鎖了 localStorage(隱私模式或 cookie 設定)。卦象暫不能跨會話保留。存儲恢復後,已存之卦會自動顯示。" },
  })[lang];

  useEffect(() => {
    listReadings().then(setReadings);
  }, []);

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (deleteConfirm === id) {
      const ok = await deleteReading(id);
      if (ok) {
        setReadings(rs => rs.filter(r => r.id !== id));
        setDeleteConfirm(null);
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(c => c === id ? null : c), 3000);
    }
  }

  async function handleClearAll() {
    if (deleteConfirm === 'all') {
      const ids = readings.map(r => r.id);
      for (const id of ids) await deleteReading(id);
      setReadings([]);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm('all');
      setTimeout(() => setDeleteConfirm(c => c === 'all' ? null : c), 3000);
    }
  }

  function formatDate(iso) {
    try {
      const d = new Date(iso);
      const locale = lang === 'zh' ? 'zh-CN' : lang === 'vi' ? 'vi-VN' : 'en-US';
      return d.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
  }

  if (selected) {
    return (
      <div>
        <div className="max-w-3xl mx-auto px-6 pt-6">
          <button onClick={() => setSelected(null)} className="text-sm text-stone-600 hover:text-rose-900 transition-colors">
            ← {labels.back}
          </button>
        </div>
        <ReadingDisplay t={t} lang={lang} reading={selected} onAgain={() => setSelected(null)} />
      </div>
    );
  }

  if (readings === null) {
    return <div className="max-w-3xl mx-auto px-6 py-8 text-stone-500 text-sm">{labels.loading}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-baseline justify-between mb-6 gap-4">
        <h2 className="text-2xl font-serif text-stone-900">{labels.title}</h2>
        {readings.length > 0 && (
          <button onClick={handleClearAll}
            className={`text-xs px-3 py-1 border rounded transition-colors flex-shrink-0 ${deleteConfirm === 'all' ? 'border-rose-700 text-rose-700 bg-rose-50' : 'border-stone-400 text-stone-600 hover:border-rose-900 hover:text-rose-900'}`}>
            {deleteConfirm === 'all' ? labels.confirmAll : labels.clearAll}
          </button>
        )}
      </div>

      {!isStorageAvailable() ? (
        <div className="text-sm py-6 px-5 border border-amber-300 bg-amber-50 rounded">
          <div className="font-medium text-amber-900 mb-1">⚠ {labels.noStorageT}</div>
          <div className="text-amber-800 leading-relaxed">{labels.noStorageB}</div>
        </div>
      ) : readings.length === 0 ? (
        <div className="text-stone-500 text-sm py-12 text-center border border-stone-200 border-dashed rounded">
          {labels.empty}
        </div>
      ) : (
        <div className="space-y-2">
          {readings.map(r => {
            const data = r.data;
            const ben = getHex(data.u, data.l);
            if (!ben) return null;
            return (
              <div key={r.id} onClick={() => setSelected(data)}
                className="cursor-pointer w-full bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 transition-colors rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0"><HexLines u={data.u} l={data.l} change={data.change} size="sm" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.zh}</span>
                      <span className="text-sm text-stone-700 truncate">{hexName(ben, lang)}</span>
                      <span className="text-xs text-stone-400">#{ben.n}</span>
                    </div>
                    {data.question ? (
                      <div className="text-xs text-stone-700 italic truncate mb-1">"{data.question}"</div>
                    ) : (
                      <div className="text-xs text-stone-400 italic mb-1">{labels.anonQ}</div>
                    )}
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 flex-wrap">
                      <span>{formatDate(r.createdAt)}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.methodNames[data.method]}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.line} {data.change}</span>
                    </div>
                  </div>
                  <button onClick={e => handleDelete(r.id, e)}
                    className={`text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${deleteConfirm === r.id ? 'bg-rose-700 text-white' : 'text-stone-400 hover:text-rose-700'}`}>
                    {deleteConfirm === r.id ? labels.confirmDel : '✕'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

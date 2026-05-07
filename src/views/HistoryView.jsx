import { useEffect, useState } from "react";
import HexLines from "../components/HexLines.jsx";
import ReadingDisplay from "./ReadingDisplay.jsx";
import { getHex, hexName } from "../domain/trigrams.js";
import { isStorageAvailable, listReadings, deleteReading } from "../storage/local.js";
import { notifyLocalWrite } from "../sync/engine.js";

export default function HistoryView({ t, lang }) {
  const [entries, setEntries] = useState(null);
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const labels = ({
    vi: { title: "Quẻ đã lưu", empty: "Chưa có quẻ nào được lưu. Hãy dựng một quẻ ở mục Bốc quẻ.", confirmDel: "Xóa?", clearAll: "Xóa hết", confirmAll: "Xóa tất cả?", loading: "Đang tải...", back: "Danh sách", anonQ: "(không có câu hỏi)", noStorageT: "Bộ nhớ không khả dụng", noStorageB: "Trình duyệt đã chặn localStorage (chế độ riêng tư hoặc cài đặt cookie). Quẻ sẽ không được giữ lại sau khi đóng. Khi bộ nhớ hoạt động trở lại, các quẻ đã lưu sẽ tự hiện ở đây." },
    en: { title: "Saved readings", empty: "No saved readings yet. Cast one in the Cast tab.", confirmDel: "Delete?", clearAll: "Clear all", confirmAll: "Delete all?", loading: "Loading...", back: "List", anonQ: "(no question)", noStorageT: "Storage unavailable", noStorageB: "The browser is blocking localStorage (private mode or cookie settings). Readings can't be kept across sessions right now. When storage comes back, your saved readings will appear here automatically." },
    zh: { title: "已存卦", empty: "暫無已存。請於起卦處起一卦。", confirmDel: "刪?", clearAll: "全部清空", confirmAll: "全部刪除?", loading: "載入中…", back: "列表", anonQ: "(無問)", noStorageT: "存儲不可用", noStorageB: "瀏覽器封鎖了 localStorage(隱私模式或 cookie 設定)。卦象暫不能跨會話保留。存儲恢復後,已存之卦會自動顯示。" },
  })[lang];

  useEffect(() => {
    listReadings().then(setEntries);
  }, []);

  async function handleDelete(id, event) {
    event.stopPropagation();
    if (deleteConfirm === id) {
      const ok = await deleteReading(id);
      if (ok) {
        setEntries(rs => rs.filter(entry => entry.id !== id));
        setDeleteConfirm(null);
        notifyLocalWrite();
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(c => c === id ? null : c), 3000);
    }
  }

  async function handleClearAll() {
    if (deleteConfirm === 'all') {
      const ids = entries.map(entry => entry.id);
      for (const id of ids) await deleteReading(id);
      setEntries([]);
      setDeleteConfirm(null);
      notifyLocalWrite();
    } else {
      setDeleteConfirm('all');
      setTimeout(() => setDeleteConfirm(c => c === 'all' ? null : c), 3000);
    }
  }

  function formatDate(iso) {
    try {
      const date = new Date(iso);
      const locale = lang === 'zh' ? 'zh-CN' : lang === 'vi' ? 'vi-VN' : 'en-US';
      return date.toLocaleString(locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
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

  if (entries === null) {
    return <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-stone-500 text-sm">{labels.loading}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-baseline justify-between mb-6 gap-4">
        <h2 className="text-2xl font-serif text-stone-900">{labels.title}</h2>
        {entries.length > 0 && (
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
      ) : entries.length === 0 ? (
        <div className="text-stone-500 text-sm py-12 text-center border border-stone-200 border-dashed rounded">
          {labels.empty}
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => {
            const reading = entry.data;
            const originalHex = getHex(reading.upper, reading.lower);
            if (!originalHex) return null;
            return (
              <div key={entry.id} onClick={() => setSelected(reading)}
                className="cursor-pointer w-full bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 transition-colors rounded p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0"><HexLines upper={reading.upper} lower={reading.lower} changingLine={reading.changingLine} size="sm" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-lg font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{originalHex.zh}</span>
                      <span className="text-sm text-stone-700 truncate">{hexName(originalHex, lang)}</span>
                      <span className="text-xs text-stone-400">#{originalHex.n}</span>
                    </div>
                    {reading.question ? (
                      <div className="text-xs text-stone-700 italic truncate mb-1">"{reading.question}"</div>
                    ) : (
                      <div className="text-xs text-stone-400 italic mb-1">{labels.anonQ}</div>
                    )}
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 flex-wrap">
                      <span>{formatDate(entry.createdAt)}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.methodNames[reading.method]}</span>
                      <span className="text-stone-300">·</span>
                      <span>{t.result.line} {reading.changingLine}</span>
                    </div>
                  </div>
                  <button onClick={event => handleDelete(entry.id, event)}
                    className={`text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${deleteConfirm === entry.id ? 'bg-rose-700 text-white' : 'text-stone-400 hover:text-rose-700'}`}>
                    {deleteConfirm === entry.id ? labels.confirmDel : '✕'}
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

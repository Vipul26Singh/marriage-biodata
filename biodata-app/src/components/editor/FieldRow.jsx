export default function FieldRow({ field, secId, ci, onUpdate, onRemove }) {
  return (
    <div className="fr">
      <input
        className="fi key"
        placeholder="Label"
        value={field.key}
        onChange={(e) => onUpdate(field.id, "key", e.target.value)}
      />
      <input
        className="fi"
        placeholder="Value"
        value={field.value}
        onChange={(e) => onUpdate(field.id, "value", e.target.value)}
      />
      <button className="del-f" onClick={() => onRemove(field.id)}>
        ✕
      </button>
    </div>
  );
}

import React, { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

type SideValues = {
  d: string;
  e: string;
};

type ItemKind = "side" | "text";

type DataItem = {
  id: string;
  label: string;
  reference?: string;
  kind: ItemKind;
  initial: SideValues | string;
  final: SideValues | string;
  options?: string[];
};

const seasonLabels: Record<string, string> = {
  "24-25": "Temporada 24/25",
  "25-26": "Temporada 25/26",
};

type SeasonEntry = {
  initial: SideValues | string;
  final: SideValues | string;
};

type SeasonStorage = {
  items: Record<string, SeasonEntry>;
  posturalInitial: string[];
  posturalFinal: string[];
};

const STORAGE_KEY = "dashboard-medidas-25-26";

const anthropometricItems: DataItem[] = [
  {
    id: "perimetria-coxa-distal",
    label: "Perimetria Coxa Distal",
    kind: "side",
    initial: { d: "46cm", e: "45cm" },
    final: { d: "48cm", e: "48cm" },
  },
  {
    id: "perimetria-coxa-proximal",
    label: "Perimetria Coxa Proximal",
    kind: "side",
    initial: { d: "54cm", e: "54cm" },
    final: { d: "56cm", e: "56cm" },
  },
  {
    id: "comprimento-perna-d",
    label: "Comprimento Perna D",
    kind: "text",
    initial: "100cm",
    final: "100cm",
  },
  {
    id: "comprimento-perna-e",
    label: "Comprimento Perna E",
    kind: "text",
    initial: "100cm",
    final: "100cm",
  },
];

const mobilityItems: DataItem[] = [
  {
    id: "angulo-popliteo",
    label: "Angulo Popliteo",
    reference: ">170",
    kind: "side",
    initial: { d: "172", e: "170" },
    final: { d: "174", e: "173" },
  },
  {
    id: "rotacao-ext-quadril",
    label: "Rotação Ext Quadril",
    reference: ">40",
    kind: "side",
    initial: { d: "40", e: "41" },
    final: { d: "41", e: "41" },
  },
  {
    id: "rotacao-interna",
    label: "Rotação Interna",
    reference: ">30",
    kind: "side",
    initial: { d: "38", e: "39" },
    final: { d: "39", e: "39" },
  },
  {
    id: "flexao-tronco",
    label: "Flexão de Tronco",
    reference: "Negativo",
    kind: "text",
    options: ["Negativo", "Positivo"],
    initial: "Negativo",
    final: "Negativo",
  },
  {
    id: "dorsi-flexao-ativa",
    label: "Dorsi flexão ativa",
    reference: ">45",
    kind: "side",
    initial: { d: "41,7", e: "46,8" },
    final: { d: "43", e: "44,8" },
  },
  {
    id: "flexao-coxa",
    label: "Flexão de coxa",
    reference: ">85",
    kind: "side",
    initial: { d: "75,7", e: "71,8" },
    final: { d: "78,7", e: "74,8" },
  },
  {
    id: "thomas",
    label: "Thomas",
    reference: "Negativo",
    kind: "text",
    options: ["Negativo", "Positivo"],
    initial: "Positivo",
    final: "Negativo",
  },
];

const balanceItems: DataItem[] = [
  {
    id: "balance-equilibrium",
    label: "Balance Equilibrium",
    reference: "Assim >3%",
    kind: "side",
    initial: { d: "56", e: "44" },
    final: { d: "56", e: "44" },
  },
  {
    id: "y-test",
    label: "Y Test",
    reference: "Assim >10%",
    kind: "side",
    initial: { d: "105", e: "99" },
    final: { d: "105", e: "99" },
  },
  {
    id: "single-hop-test",
    label: "Single Hop Test",
    reference: "Assim >10%",
    kind: "side",
    initial: { d: "2,05m", e: "2,05m" },
    final: { d: "2,05m", e: "2,05m" },
  },
  {
    id: "triple-hop-test",
    label: "Triple Hop Test",
    reference: "Assim >10%",
    kind: "side",
    initial: { d: "6,40m", e: "6,32m" },
    final: { d: "6,40m", e: "6,32m" },
  },
  {
    id: "square-hop-test",
    label: "Square Hop Test",
    reference: "0,30s",
    kind: "side",
    initial: { d: "0,24s", e: "0,27s" },
    final: { d: "0,24s", e: "0,27s" },
  },
  {
    id: "side-hop-test",
    label: "Side Hop Test",
    reference: "Assim >10%",
    kind: "text",
    initial: "a realizar",
    final: "a realizar",
  },
];

const DashboardMedidasTemporada: React.FC = () => {
  const navigate = useNavigate();
  const { temporada } = useParams();
  const seasonKey = temporada === "24-25" || temporada === "25-26" ? temporada : null;
  const seasonLabel = seasonKey ? seasonLabels[seasonKey] : "Temporada";
  const isEditable = seasonKey === "25-26";
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string>("");
  const saveTimer = useRef<number | null>(null);

  const allItems = useMemo(
    () => [...anthropometricItems, ...mobilityItems, ...balanceItems],
    []
  );

  const buildDefaultStorage = () =>
    allItems.reduce<SeasonStorage>(
      (acc, item) => {
        acc.items[item.id] = {
          initial: item.kind === "side" ? { d: "", e: "" } : "",
          final: item.kind === "side" ? { d: "", e: "" } : "",
        };
        return acc;
      },
      { items: {}, posturalInitial: [], posturalFinal: [] }
    );

  const loadStorage = (): SeasonStorage => {
    if (typeof window === "undefined") {
      return buildDefaultStorage();
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return buildDefaultStorage();
    }

    try {
      const parsed = JSON.parse(raw) as SeasonStorage;
      if (!parsed?.items) {
        return buildDefaultStorage();
      }
      return {
        items: { ...buildDefaultStorage().items, ...parsed.items },
        posturalInitial: parsed.posturalInitial ?? [],
        posturalFinal: parsed.posturalFinal ?? [],
      };
    } catch {
      return buildDefaultStorage();
    }
  };

  const [seasonStorage, setSeasonStorage] = useState<SeasonStorage>(() =>
    isEditable ? loadStorage() : buildDefaultStorage()
  );

  const persistStorage = (next: SeasonStorage) => {
    if (!isEditable || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaveState("saving");
    if (saveTimer.current) {
      window.clearTimeout(saveTimer.current);
    }
    saveTimer.current = window.setTimeout(() => {
      setSaveState("saved");
      const now = new Date();
      setLastSavedAt(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        window.clearTimeout(saveTimer.current);
      }
    };
  }, []);

  const renderValue = (value: SideValues | string) => {
    if (typeof value === "string") {
      return value;
    }
    return `D: ${value.d} | E: ${value.e}`;
  };

  const renderSideInputs = (
    itemId: string,
    phase: "initial" | "final",
    current: SideValues
  ) => (
    <div className="flex items-center gap-2">
      <input
        className="form-input text-xs"
        placeholder="D"
        name={`${itemId}-${phase}-d`}
        aria-label={`${itemId}-${phase}-d`}
        value={current.d}
        onChange={(event) => {
          const nextValue = event.target.value;
          setSeasonStorage((prev) => {
            const entry = prev.items[itemId];
            if (!entry || typeof entry[phase] === "string") {
              return prev;
            }
            const next: SeasonStorage = {
              ...prev,
              items: {
                ...prev.items,
                [itemId]: {
                  ...entry,
                  [phase]: { ...(entry[phase] as SideValues), d: nextValue },
                },
              },
            };
            persistStorage(next);
            return next;
          });
        }}
      />
      <input
        className="form-input text-xs"
        placeholder="E"
        name={`${itemId}-${phase}-e`}
        aria-label={`${itemId}-${phase}-e`}
        value={current.e}
        onChange={(event) => {
          const nextValue = event.target.value;
          setSeasonStorage((prev) => {
            const entry = prev.items[itemId];
            if (!entry || typeof entry[phase] === "string") {
              return prev;
            }
            const next: SeasonStorage = {
              ...prev,
              items: {
                ...prev.items,
                [itemId]: {
                  ...entry,
                  [phase]: { ...(entry[phase] as SideValues), e: nextValue },
                },
              },
            };
            persistStorage(next);
            return next;
          });
        }}
      />
    </div>
  );

  const renderTextInput = (
    itemId: string,
    phase: "initial" | "final",
    current: string,
    options?: string[]
  ) => {
    if (options?.length) {
      return (
        <select
          className="form-input text-xs"
          name={`${itemId}-${phase}`}
          aria-label={`${itemId}-${phase}`}
          value={current}
          onChange={(event) => {
            const nextValue = event.target.value;
            setSeasonStorage((prev) => {
              const entry = prev.items[itemId];
              if (!entry || typeof entry[phase] !== "string") {
                return prev;
              }
              const next: SeasonStorage = {
                ...prev,
                items: {
                  ...prev.items,
                  [itemId]: { ...entry, [phase]: nextValue },
                },
              };
              persistStorage(next);
              return next;
            });
          }}
        >
          <option value="" disabled>
            Selecionar
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className="form-input text-xs"
        placeholder="Preencher"
        name={`${itemId}-${phase}`}
        aria-label={`${itemId}-${phase}`}
        value={current}
        onChange={(event) => {
          const nextValue = event.target.value;
          setSeasonStorage((prev) => {
            const entry = prev.items[itemId];
            if (!entry || typeof entry[phase] !== "string") {
              return prev;
            }
            const next: SeasonStorage = {
              ...prev,
              items: {
                ...prev.items,
                [itemId]: { ...entry, [phase]: nextValue },
              },
            };
            persistStorage(next);
            return next;
          });
        }}
      />
    );
  };

  const readFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return [];
    }

    const list = Array.from(files);
    const results = await Promise.all(
      list.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result ?? ""));
            reader.onerror = () => reject(new Error("Erro ao ler imagem"));
            reader.readAsDataURL(file);
          })
      )
    );
    return results.filter(Boolean);
  };

  const handlePosturalChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    phase: "initial" | "final"
  ) => {
    const urls = await readFiles(event.target.files);
    setSeasonStorage((prev) => {
      const next: SeasonStorage = {
        ...prev,
        posturalInitial: phase === "initial" ? urls : prev.posturalInitial,
        posturalFinal: phase === "final" ? urls : prev.posturalFinal,
      };
      persistStorage(next);
      return next;
    });
  };

  const renderSection = (title: string, items: DataItem[], showReference = false) => {
    const gridCols = showReference ? "md:grid-cols-[1.6fr_1fr_1fr_0.8fr]" : "md:grid-cols-[1.6fr_1fr_1fr]";
    return (
      <section className="glass-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h2>
          <span className="text-xs text-muted-foreground">Comparativo início x final</span>
        </div>
        <div className={`grid grid-cols-1 ${gridCols} gap-3 text-xs uppercase text-muted-foreground`}>
          <div>Subitem</div>
          <div>Início</div>
          <div>Final</div>
          {showReference && <div>Referência</div>}
        </div>
        <div className="mt-2 divide-y divide-border/40">
          {items.map((item) => (
            <div
              key={item.id}
              className={`grid grid-cols-1 ${gridCols} gap-3 py-3 text-sm`}
            >
              <div className="font-medium text-foreground">{item.label}</div>
              <div className="text-muted-foreground">
                {isEditable
                  ? item.kind === "side"
                    ? renderSideInputs(
                        item.id,
                        "initial",
                        seasonStorage.items[item.id]?.initial as SideValues
                      )
                    : renderTextInput(
                        item.id,
                        "initial",
                        String(seasonStorage.items[item.id]?.initial ?? ""),
                        item.options
                      )
                  : renderValue(item.initial)}
              </div>
              <div className="text-muted-foreground">
                {isEditable
                  ? item.kind === "side"
                    ? renderSideInputs(
                        item.id,
                        "final",
                        seasonStorage.items[item.id]?.final as SideValues
                      )
                    : renderTextInput(
                        item.id,
                        "final",
                        String(seasonStorage.items[item.id]?.final ?? ""),
                        item.options
                      )
                  : renderValue(item.final)}
              </div>
              {showReference && (
                <div className="text-muted-foreground">{item.reference ?? "-"}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  if (!seasonKey) {
    return (
      <div className="min-h-screen gradient-hero text-foreground flex flex-col items-center justify-center px-6">
        <p className="text-lg font-semibold mb-4">Temporada não encontrada</p>
        <button className="btn-primary" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero text-foreground pb-16">
      <header className="px-4 sm:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Dashboard de Medidas</span>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {seasonLabel}
          </h1>
          <div className="flex items-center gap-2">
            {isEditable && saveState !== "idle" && (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                  saveState === "saved"
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-border/60 bg-card/60 text-muted-foreground"
                }`}
              >
                {saveState === "saving" ? "Salvando..." : "Salvo"}
              </span>
            )}
            {isEditable && lastSavedAt && (
              <span className="text-xs text-muted-foreground">
                Ultimo salvamento: {lastSavedAt}
              </span>
            )}
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
              {isEditable ? "Preenchimento em andamento" : "Dados confirmados"}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Acompanhe os resultados da temporada com comparação entre início e final, incluindo
          dados antropométricos, mobilidade, equilíbrio e análise postural.
        </p>
      </header>

      <main className="px-4 sm:px-8 mt-6 max-w-5xl mx-auto w-full space-y-6">
        {renderSection("Dados Antropométricos", anthropometricItems)}
        {renderSection("Mobilidade", mobilityItems, true)}
        {renderSection("Equilíbrio", balanceItems, true)}

        <section className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Postural</h2>
            <span className="text-xs text-muted-foreground">Imagens de análise postural</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/40 border border-border/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Início da temporada</p>
                {isEditable && (
                  <label className="inline-flex items-center gap-2 text-xs text-primary cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Anexar fotos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => handlePosturalChange(event, "initial")}
                    />
                  </label>
                )}
              </div>
              {seasonStorage.posturalInitial.length === 0 ? (
                <div className="border border-dashed border-border/60 rounded-xl p-6 text-xs text-muted-foreground text-center">
                  Nenhuma imagem anexada
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {seasonStorage.posturalInitial.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Postural início"
                      className="w-full h-32 object-cover rounded-lg border border-border/50"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="bg-card/40 border border-border/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Final da temporada</p>
                {isEditable && (
                  <label className="inline-flex items-center gap-2 text-xs text-primary cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Anexar fotos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => handlePosturalChange(event, "final")}
                    />
                  </label>
                )}
              </div>
              {seasonStorage.posturalFinal.length === 0 ? (
                <div className="border border-dashed border-border/60 rounded-xl p-6 text-xs text-muted-foreground text-center">
                  Nenhuma imagem anexada
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {seasonStorage.posturalFinal.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="Postural final"
                      className="w-full h-32 object-cover rounded-lg border border-border/50"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardMedidasTemporada;

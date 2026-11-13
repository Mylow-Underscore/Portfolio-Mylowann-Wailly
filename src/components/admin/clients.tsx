"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

interface Client {
  id: number;
  code: string;
  mot_de_passe: string;
  nomPrenom: string;
  raison_Sociale: string | null;
  siret: string | null;
  tel: string | null;
  email: string | null;
  createdAt: string;
}

const C = {
  blanc: "#f3f3f3",
  gris: "#9a9aa3",
  grisMid: "#17171b",
  grisDark: "#0f0f12",
  border: "#2a2a30",
  rose: "#ff4d8d",
  bordeaux: "#7b1e3a",
  warning: "#ffbf47",
  success: "#34c759",
  error: "#ff5a5a",
};

const COLORS = {
  white: "#ffffff",
  gold: "#d4af37",
  accent: "#f5c55d",
};

export const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({ nom: "", prenom: "", tel: "", email: "", raison_Sociale: "", siret: ""});
  const [creating, setCreating] = useState(false);
  const [newCode, setNewCode] = useState<string | null>(null);
  const [newMDP, setNewMDP] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cr] = await Promise.all([
        fetch("/api/clients"),
      ]);

      if (cr.ok) {
        const d = await cr.json();
        setClients(d.clients ?? []);
      }
    } catch (error) {
      console.error("Fetch clients error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (!r.ok) {
          router.replace("/login");
          return;
        }

        const d = await r.json();
        if (!d.isAdmin) {
          router.replace("/compte");
          return;
        }

        fetchData();
      })
      .catch(() => router.replace("/login"));
  }, [router, fetchData]);

  const handleCreate = async () => {
    if (!form.nom.trim() || !form.prenom.trim() || !form.raison_Sociale || !form.siret) {
      setFormError("Champs obligatoires : Nom, Prénom, Raison Sociale, SIRET");
      return;
    }

    setCreating(true);
    setFormError("");
    setNewCode(null);
    setNewMDP(null);

    try {
      const r = await fetch("/api/clients/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const d = await r.json();
      if (!r.ok) {
        setFormError(d.error ?? "Erreur");
        setCreating(false);
        return;
      }

      setNewCode(d.code);
      setNewMDP(d.mot_de_passe);
      setForm({ nom: "", prenom: "", tel: "", email: "", raison_Sociale: "", siret: "", mot_de_passe: ""});
      fetchData();
    } catch {
      setFormError("Erreur serveur.");
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR");

  const filteredClients = clientSearch
    ? clients.filter((c) => {
        const query = clientSearch.toLowerCase();
        return (
          c.nomPrenom.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          (c.email ?? "").toLowerCase().includes(query) ||
          c.id.toString() === clientSearch.trim()
        );
      })
    : clients;

  return (
    <>
      {loading ? (
        <div style={{ padding: "40px 20px", color: C.gris, textAlign: "center" }}>Chargement...</div>
      ) : (
        <motion.div key="clients" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ paddingTop: 32 }}>
          <div className="max-md:hidden md:grid relative" style={{ gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 36 }}>
            <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
              <p style={{ color: C.rose, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Créer un client</p>
              <AnimatePresence>
                {newCode && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: `${C.success}15`, border: `1px solid ${C.success}40`, padding: "12px 16px", marginBottom: 16 }}>
                    <p style={{ color: C.success, fontSize: 13, fontWeight: 700, margin: "0 0 2px" }}>✓ Client créé</p>
                    <p style={{ color: C.gris, fontSize: 12, margin: 0 }}>Code client : <strong style={{ color: C.blanc, letterSpacing: "0.15em", fontSize: 16 }}>{newCode}</strong></p>
                  </motion.div>
                )}
                {newMDP && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: `${C.success}15`, border: `1px solid ${C.success}40`, padding: "12px 16px", marginBottom: 16 }}>
                    <p style={{ color: C.success, fontSize: 13, fontWeight: 700, margin: "0 0 2px" }}>✓ Mot de passe généré</p>
                    <p style={{ color: C.gris, fontSize: 12, margin: 0 }}>Mot de passe : <strong style={{ color: C.blanc, letterSpacing: "0.15em", fontSize: 16 }}>{newMDP}</strong></p>
                  </motion.div>
                )}
                {formError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: `${C.error}15`, border: `1px solid ${C.error}40`, padding: "10px 14px", marginBottom: 12 }}>
                    <p style={{ color: C.error, fontSize: 12, margin: 0 }}>{formError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[{ key: "nom", label: "Nom *", ph: "Wailly" }, { key: "prenom", label: "Prénom *", ph: "Mylowann" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, [f.key]: e.target.value }));
                        setFormError("");
                        setNewCode(null);
                      }}
                      placeholder={f.ph}
                      style={{ width: "100%", background: C.grisMid, border: `1px solid ${C.border}`, color: C.blanc, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = C.rose;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[{ key: "raison_Sociale", label: "Raison Sociale *", ph: "Wyloz Business" }, { key: "siret", label: "SIRET *", ph: "123 456 789 00012" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, [f.key]: e.target.value }));
                        setFormError("");
                        setNewCode(null);
                      }}
                      placeholder={f.ph}
                      style={{ width: "100%", background: C.grisMid, border: `1px solid ${C.border}`, color: C.blanc, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = C.rose;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[{ key: "tel", label: "Téléphone", ph: "06 XX XX XX XX" }, { key: "email", label: "Email", ph: "client@mail.com" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.ph}
                      style={{ width: "100%", background: C.grisMid, border: `1px solid ${C.border}`, color: C.blanc, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = C.rose;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ background: C.grisMid, padding: "9px 13px", marginBottom: 14 }}>
                <p style={{ color: C.gris, fontSize: 11, margin: 0 }}>Code auto : <strong style={{ color: C.blanc }}>initiale nom + initiale prénom + dizaine</strong> · Ex: <span style={{ color: C.rose }}>WM100</span></p>
              </div>

              <motion.button onClick={handleCreate} disabled={creating} whileTap={!creating ? { scale: 0.97 } : {}} style={{ width: "100%", background: creating ? C.grisMid : C.bordeaux, color: creating ? "#555" : C.blanc, border: "none", padding: "13px", fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", cursor: creating ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background 0.2s" }}>
                {creating ? "Création…" : "Créer le client →"}
              </motion.button>
            </div>

            <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
              <p style={{ color: C.rose, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Statistiques clients</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Total clients", value: clients.length, color: C.rose },
                  { label: "Avec email", value: clients.filter((c) => c.email).length, color: C.gris },
                  { label: "Avec téléphone", value: clients.filter((c) => c.tel).length, color: C.gris },
                ].map((s) => (
                  <div key={s.label} style={{ background: C.grisMid, padding: "14px 16px", border: `1px solid ${C.border}` }}>
                    <p style={{ color: C.gris, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ color: s.color, fontWeight: 900, fontSize: 24, margin: 0 }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-md:grid md:hidden" style={{ gridTemplateColumns: "1fr", gap: 28, marginBottom: 36 }}>
            <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
              <p style={{ color: C.rose, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Créer un client</p>
              <AnimatePresence>
                {newCode && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ background: `${C.success}15`, border: `1px solid ${C.success}40`, padding: "12px 16px", marginBottom: 16 }}>
                    <p style={{ color: C.success, fontSize: 13, fontWeight: 700, margin: "0 0 2px" }}>✓ Client créé</p>
                    <p style={{ color: C.gris, fontSize: 12, margin: 0 }}>Code client : <strong style={{ color: C.blanc, letterSpacing: "0.15em", fontSize: 16 }}>{newCode}</strong></p>
                  </motion.div>
                )}
                {formError && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: `${C.error}15`, border: `1px solid ${C.error}40`, padding: "10px 14px", marginBottom: 12 }}>
                    <p style={{ color: C.error, fontSize: 12, margin: 0 }}>{formError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[{ key: "nom", label: "Nom *", ph: "Wailly" }, { key: "prenom", label: "Prénom *", ph: "Mylowann" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => {
                        setForm((p) => ({ ...p, [f.key]: e.target.value }));
                        setFormError("");
                        setNewCode(null);
                      }}
                      placeholder={f.ph}
                      style={{ width: "100%", background: C.grisMid, border: `1px solid ${C.border}`, color: C.blanc, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = C.rose;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[{ key: "tel", label: "Téléphone", ph: "06 XX XX XX XX" }, { key: "email", label: "Email", ph: "client@mail.com" }].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, display: "block", marginBottom: 5 }}>{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.ph}
                      style={{ width: "100%", background: C.grisMid, border: `1px solid ${C.border}`, color: C.blanc, padding: "9px 11px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = C.rose;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ background: C.grisMid, padding: "9px 13px", marginBottom: 14 }}>
                <p style={{ color: C.gris, fontSize: 11, margin: 0 }}>Code auto : <strong style={{ color: C.blanc }}>initiale nom + initiale prénom + dizaine</strong> · Ex: <span style={{ color: C.rose }}>WM100</span></p>
              </div>

              <motion.button onClick={handleCreate} disabled={creating} whileTap={!creating ? { scale: 0.97 } : {}} style={{ width: "100%", background: creating ? C.grisMid : C.bordeaux, color: creating ? "#555" : C.blanc, border: "none", padding: "13px", fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", cursor: creating ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "background 0.2s" }}>
                {creating ? "Création…" : "Créer le client →"}
              </motion.button>
            </div>

            <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
              <p style={{ color: C.rose, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Statistiques clients</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Total clients", value: clients.length, color: C.rose },
                  { label: "Avec email", value: clients.filter((c) => c.email).length, color: C.gris },
                  { label: "Avec téléphone", value: clients.filter((c) => c.tel).length, color: C.gris },
                ].map((s) => (
                  <div key={s.label} style={{ background: C.grisMid, padding: "14px 16px", border: `1px solid ${C.border}` }}>
                    <p style={{ color: C.gris, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ color: s.color, fontWeight: 900, fontSize: 24, margin: 0 }}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <p style={{ color: C.rose, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>
              Liste clients ({filteredClients.length})
            </p>
            <input
              type="text"
              placeholder="Rechercher par code ou nom..."
              value={clientSearch}
              onChange={(e) => setClientSearch(e.target.value)}
              style={{
                width: "100%",
                background: C.grisMid,
                border: `2px solid ${C.border}`,
                borderRadius: "8px",
                color: C.blanc,
                padding: "14px",
                fontSize: "1rem",
                fontFamily: '"Inter", sans-serif',
                transition: "border-color 0.3s, background-color 0.3s",
              }}
            />
            {clients.length >= 2 && clientSearch && (
              <p style={{ color: C.gris, fontSize: 11, margin: "6px 0 0", width: "100%" }}>Recherche en cours…</p>
            )}
          </div>

          <div style={{ border: `1px solid ${C.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "10px 18px", background: C.grisMid }}>
              {["Nom", "Téléphone", "Code", "Depuis"].map((h) => (
                <span key={h} style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gris, fontWeight: 700 }}>{h}</span>
              ))}
            </div>

            {filteredClients.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: C.gris, fontSize: 13 }}>Aucun client trouvé.</div>
            ) : (
              filteredClients.map((c, i) => {
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                    style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 18px", borderTop: `1px solid ${C.border}`, alignItems: "center", cursor: "default" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = C.grisDark;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = "transparent";
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 2px" }}>{c.nomPrenom}</p>
                      {c.email && <p style={{ color: "#444", fontSize: 11, margin: 0 }}>{c.email}</p>}
                    </div>

                    <span style={{ color: COLORS.white, fontWeight: 700, fontSize: 12 }}>{c.tel || "Non renseigné"}</span>
                    <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 12 }}>{c.code}</span>
                    <span style={{ color: COLORS.accent, fontSize: 11 }}>{formatDate(c.createdAt)}</span>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

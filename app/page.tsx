"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";



type Vehiculo = {
  id: number;
  created_at?: string;
  placa: string | null;
  marca: string | null;
  modelo: string | null;
  color: string | null;
  tipo: string | null;
  folio: string | null;
  fecha_evento: string | null;
  zona: string | null;
  delito: string | null;
  banda: string | null;
  observaciones: string | null;
  palabras_clave: string | null;
  estatus: string | null;
  vinculos: string | null;
};

type FormData = {
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  tipo: string;
  folio: string;
  fecha_evento: string;
  zona: string;
  delito: string;
  banda: string;
  observaciones: string;
  palabras_clave: string;
  estatus: string;
  vinculos: string;
};

const initialForm: FormData = {
  placa: "",
  marca: "",
  modelo: "",
  color: "",
  tipo: "",
  folio: "",
  fecha_evento: "",
  zona: "",
  delito: "",
  banda: "",
  observaciones: "",
  palabras_clave: "",
  estatus: "",
  vinculos: "",
};

const styles = {
  page: {
  minHeight: "100vh",
  background: "#0b1220",
  color: "#e5e7eb",
  fontFamily: "Arial, sans-serif",
  padding: "16px",
} as React.CSSProperties,
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
  } as React.CSSProperties,
  header: {
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "#fff",
  borderRadius: "16px",
  padding: "18px",
  marginBottom: "20px",
  boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
} as React.CSSProperties,

title: {
  margin: 0,
  fontSize: "32px",
  fontWeight: 800,
  letterSpacing: "1px",
  color: "#ffffff",
} as React.CSSProperties,

subtitle: {
  marginTop: "8px",
  color: "#cbd5e1",
  fontSize: "14px",
} as React.CSSProperties,
  banner: {
    margin: "12px 0 20px 0",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "#eef3ff",
    border: "1px solid #c9d8ff",
    color: "#1f3a8a",
    fontWeight: 600,
  } as React.CSSProperties,
  layout: {
  display: "grid",
  gridTemplateColumns: "minmax(320px, 380px) 1fr",
  gap: "20px",
  alignItems: "start",
} as React.CSSProperties,
  panel: {
    background: "#111827",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    border: "1px solid #1f2937",
  } as React.CSSProperties,
  panelTitle: {
    margin: "0 0 14px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
  } as React.CSSProperties,
  input: {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #475569",
  outline: "none",
  fontSize: "14px",
  background: "#0f172a",
  color: "#e5e7eb",
  boxSizing: "border-box",
} as React.CSSProperties,
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "14px",
    minHeight: "72px",
    resize: "vertical" as const,
    background: "#111827",
    boxSizing: "border-box" as const,
  } as React.CSSProperties,
  formGrid: {
    display: "grid",
    gap: "10px",
  } as React.CSSProperties,
  buttonPrimary: {
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  buttonSecondary: {
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  buttonDanger: {
    background: "#dc2626",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  buttonInfo: {
    background: "#0f766e",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  buttonEdit: {
    background: "#f59e0b",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: 700,
    cursor: "pointer",
  } as React.CSSProperties,
  filterGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "10px",
  marginTop: "10px",
  marginBottom: "12px",
} as React.CSSProperties,
  cards: {
    display: "grid",
    gap: "14px",
  } as React.CSSProperties,
  card: {
  background: "linear-gradient(145deg, #111827, #020617)",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 0 0 1px #1f2937, 0 10px 30px rgba(0,0,0,0.6)",
} as React.CSSProperties,
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap" as const,
  } as React.CSSProperties,
  placa: {
    fontSize: "22px",
fontWeight: 900,
color: "#38bdf8",
letterSpacing: "1px",
  } as React.CSSProperties,
  badge: {
    background: "#fee2e2",
    color: "#991b1b",
    padding: "4px 8px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
  } as React.CSSProperties,
  detailGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "8px 16px",
  fontSize: "14px",
  marginBottom: "12px",
} as React.CSSProperties,
  detailFull: {
    gridColumn: "1 / -1",
  } as React.CSSProperties,
  label: {
    fontWeight: 700,
    color: "#e5e7eb",
  } as React.CSSProperties,
  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
    marginTop: "10px",
  } as React.CSSProperties,
  historyPanel: {
    marginTop: "22px",
    background: "#111827",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    border: "1px solid #e5e7eb",
  } as React.CSSProperties,
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap" as const,
    marginBottom: "12px",
  } as React.CSSProperties,

  btnHistorial: {
  background: "#0ea5e9",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px",
  fontSize: "12px",
  cursor: "pointer",
} as React.CSSProperties,

btnEditar: {
  background: "#f59e0b",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px",
  fontSize: "12px",
  cursor: "pointer",
} as React.CSSProperties,

btnEliminar: {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "6px 10px",
  fontSize: "12px",
  cursor: "pointer",
} as React.CSSProperties,
};



export default function Home() {
const [user, setUser] = useState<any>(null);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rol, setRol] = useState<string | null>(null);

  useEffect(() => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    const currentUser = data.session?.user || null;
    setUser(currentUser);

    if (currentUser) {
      const { data: rolData } = await supabase
        .from("usuarios")
        .select("rol")
        .eq("email", currentUser.email)
        .single();

      setRol(rolData?.rol || "consulta");
      console.log("ROL:", rolData?.rol);
    }
  };

  getSession();
}, []);

const login = async () => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Correo o contraseña incorrectos");
    return;
  }

  setUser(data.user);

  // 🔥 AQUÍ OBTENEMOS EL ROL
  const { data: rolData } = await supabase
    .from("usuarios")
    .select("rol")
    .eq("email", data.user.email) // 👈 IMPORTANTE: email, no id
    .single();

  setRol(rolData?.rol || "consulta");
};


 

const logout = async () => {
  await supabase.auth.signOut();
  setUser(null);
};

 

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [historialPlaca, setHistorialPlaca] = useState<string | null>(null);
  const [historialEventos, setHistorialEventos] = useState<Vehiculo[]>([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [filtroZona, setFiltroZona] = useState("");
  const [filtroBanda, setFiltroBanda] = useState("");
  const [filtroDelito, setFiltroDelito] = useState("");

 
   

  async function cargarVehiculos() {
    setLoading(true);
    setMensaje("");

    const { data, error } = await supabase
      .from("Vehiculos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setMensaje("Error al cargar: " + error.message);
      setLoading(false);
      return;
    }

    setVehiculos((data as Vehiculo[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    cargarVehiculos();
  }, []);

  

  const conteoPlacas = useMemo(() => {
    const conteo: Record<string, number> = {};
    vehiculos.forEach((v) => {
      const placa = (v.placa || "").trim().toUpperCase();
      if (!placa) return;
      conteo[placa] = (conteo[placa] || 0) + 1;
    });
    return conteo;
  }, [vehiculos]);

  const zonasDisponibles = useMemo(() => {
    return [...new Set(
      vehiculos.map((v) => (v.zona || "").trim()).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [vehiculos]);

  const bandasDisponibles = useMemo(() => {
    return [...new Set(
      vehiculos.map((v) => (v.banda || "").trim()).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [vehiculos]);

  const delitosDisponibles = useMemo(() => {
    return [...new Set(
      vehiculos.map((v) => (v.delito || "").trim()).filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));
  }, [vehiculos]);

  const resultados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();

    return vehiculos.filter((v) => {
      const textoCompleto = [
        v.placa,
        v.marca,
        v.modelo,
        v.color,
        v.tipo,
        v.folio,
        v.fecha_evento,
        v.zona,
        v.delito,
        v.banda,
        v.observaciones,
        v.palabras_clave,
        v.estatus,
        v.vinculos,
      ]
        .join(" ")
        .toLowerCase();

      const coincideBusqueda = !q || textoCompleto.includes(q);
      const coincideZona = !filtroZona || (v.zona || "") === filtroZona;
      const coincideBanda = !filtroBanda || (v.banda || "") === filtroBanda;
      const coincideDelito = !filtroDelito || (v.delito || "") === filtroDelito;

      return coincideBusqueda && coincideZona && coincideBanda && coincideDelito;
    });
  }, [vehiculos, busqueda, filtroZona, filtroBanda, filtroDelito]);

   if (!user) {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>SIAVE</h1>
          <div style={styles.subtitle}>Acceso restringido</div>
        </div>

        <div style={{ ...styles.panel, maxWidth: 420, margin: "0 auto" }}>
          <h2 style={styles.panelTitle}>Iniciar sesión</h2>

          <div style={styles.formGrid}>
            <input
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.buttonPrimary} onClick={login}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "placa" ? value.toUpperCase() : value,
    }));
  }

  async function guardarVehiculo(e: React.FormEvent) {
    e.preventDefault();

    if (!form.placa || !form.marca || !form.modelo) {
      setMensaje("Llena al menos placa, marca y modelo.");
      return;
    }

    setLoading(true);
    setMensaje("");

    const payload = {
      placa: form.placa || null,
      marca: form.marca || null,
      modelo: form.modelo || null,
      color: form.color || null,
      tipo: form.tipo || null,
      folio: form.folio || null,
      fecha_evento: form.fecha_evento || null,
      zona: form.zona || null,
      delito: form.delito || null,
      banda: form.banda || null,
      observaciones: form.observaciones || null,
      palabras_clave: form.palabras_clave || null,
      estatus: form.estatus || null,
      vinculos: form.vinculos || null,
    };

    if (editandoId) {
      const { error } = await supabase
        .from("Vehiculos")
        .update(payload)
        .eq("id", editandoId);

      if (error) {
        setMensaje("Error al actualizar: " + error.message);
        setLoading(false);
        return;
      }

      setMensaje("Registro actualizado correctamente.");
    } else {
      const { error } = await supabase.from("Vehiculos").insert([payload]);

      if (error) {
        setMensaje("Error al guardar: " + error.message);
        setLoading(false);
        return;
      }

      setMensaje("Registro guardado correctamente.");
    }

    setForm(initialForm);
    setEditandoId(null);
    await cargarVehiculos();
    setLoading(false);
  }

  function editarVehiculo(v: Vehiculo) {
    setEditandoId(v.id);
    setForm({
      placa: v.placa || "",
      marca: v.marca || "",
      modelo: v.modelo || "",
      color: v.color || "",
      tipo: v.tipo || "",
      folio: v.folio || "",
      fecha_evento: v.fecha_evento || "",
      zona: v.zona || "",
      delito: v.delito || "",
      banda: v.banda || "",
      observaciones: v.observaciones || "",
      palabras_clave: v.palabras_clave || "",
      estatus: v.estatus || "",
      vinculos: v.vinculos || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setForm(initialForm);
    setMensaje("Edición cancelada.");
  }

  async function eliminarVehiculo(id: number) {
    const ok = confirm("¿Eliminar este registro?");
    if (!ok) return;

    setLoading(true);
    setMensaje("");

    const { error } = await supabase.from("Vehiculos").delete().eq("id", id);

    if (error) {
      setMensaje("Error al eliminar: " + error.message);
      setLoading(false);
      return;
    }

    if (editandoId === id) {
      setEditandoId(null);
      setForm(initialForm);
    }

    setMensaje("Registro eliminado.");
    await cargarVehiculos();
    setLoading(false);
  }

  async function verHistorial(placa: string | null) {
    if (!placa) return;

    setHistorialPlaca(placa);
    setLoadingHistorial(true);

    const { data, error } = await supabase
      .from("Vehiculos")
      .select("*")
      .eq("placa", placa)
      .order("id", { ascending: false });

    if (error) {
      setMensaje("Error al consultar historial: " + error.message);
      setHistorialEventos([]);
      setLoadingHistorial(false);
      return;
    }

    setHistorialEventos((data as Vehiculo[]) || []);
    setLoadingHistorial(false);
  }

  function cerrarHistorial() {
    setHistorialPlaca(null);
    setHistorialEventos([]);
  }

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroZona("");
    setFiltroBanda("");
    setFiltroDelito("");
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>SIAVE</h1>
          <div style={styles.subtitle}>
            Sistema de Identificación y Análisis de Vehículos en Eventos
          </div>
        </div>
        <button onClick={logout} style={{ ...styles.buttonSecondary, marginTop: 12 }}>
  Cerrar sesión
</button>
    

        {mensaje && <div style={styles.banner}>{mensaje}</div>}

        <div
  style={{
    ...styles.layout,
    gridTemplateColumns:
      typeof window !== "undefined" && window.innerWidth < 900
        ? "1fr"
        : "minmax(320px, 380px) 1fr",
  }}
>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>
              {editandoId ? `Editando registro #${editandoId}` : "Nuevo registro"}
            </h2>

            <form onSubmit={guardarVehiculo} style={styles.formGrid}>
              <input style={styles.input} name="placa" placeholder="Placa" value={form.placa} onChange={handleChange} />
              <input style={styles.input} name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
              <input style={styles.input} name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} />
              <input style={styles.input} name="color" placeholder="Color" value={form.color} onChange={handleChange} />
              <input style={styles.input} name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} />
              <input style={styles.input} name="folio" placeholder="Folio" value={form.folio} onChange={handleChange} />
              <input style={styles.input} name="fecha_evento" placeholder="Fecha del evento" value={form.fecha_evento} onChange={handleChange} />
              <input style={styles.input} name="zona" placeholder="Zona" value={form.zona} onChange={handleChange} />
              <input style={styles.input} name="delito" placeholder="Delito" value={form.delito} onChange={handleChange} />
              <input style={styles.input} name="banda" placeholder="Banda" value={form.banda} onChange={handleChange} />
              <textarea style={styles.textarea} name="observaciones" placeholder="Observaciones" value={form.observaciones} onChange={handleChange} />
              <textarea style={styles.textarea} name="palabras_clave" placeholder="Palabras clave" value={form.palabras_clave} onChange={handleChange} />
              <input style={styles.input} name="estatus" placeholder="Estatus" value={form.estatus} onChange={handleChange} />
              <textarea style={styles.textarea} name="vinculos" placeholder="Vínculos" value={form.vinculos} onChange={handleChange} />

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {rol === "admin" && (
  <button type="submit" disabled={loading} style={styles.buttonPrimary}>
    {loading
      ? editandoId
        ? "Actualizando..."
        : "Guardando..."
      : editandoId
      ? "Actualizar registro"
      : "Guardar registro"}
  </button>
  )}

                {editandoId && (
                  <button type="button" onClick={cancelarEdicion} style={styles.buttonSecondary}>
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>
          </div>

          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Búsqueda y filtros</h2>

            <input
              style={styles.input}
              placeholder="Buscar por placa, marca, modelo, banda, zona..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <div style={styles.filterGrid}>
              <select style={styles.input} value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)}>
                <option value="">Todas las zonas</option>
                {zonasDisponibles.map((zona) => (
                  <option key={zona} value={zona}>
                    {zona}
                  </option>
                ))}
              </select>

              <select style={styles.input} value={filtroBanda} onChange={(e) => setFiltroBanda(e.target.value)}>
                <option value="">Todas las bandas</option>
                {bandasDisponibles.map((banda) => (
                  <option key={banda} value={banda}>
                    {banda}
                  </option>
                ))}
              </select>

              <select style={styles.input} value={filtroDelito} onChange={(e) => setFiltroDelito(e.target.value)}>
                <option value="">Todos los delitos</option>
                {delitosDisponibles.map((delito) => (
                  <option key={delito} value={delito}>
                    {delito}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={limpiarFiltros} style={styles.buttonSecondary}>
              Limpiar filtros
            </button>

            <h2 style={{ ...styles.panelTitle, marginTop: 18 }}>
              Resultados ({resultados.length})
            </h2>

            {loading && <p>Cargando...</p>}

            <div style={styles.cards}>
              {resultados.map((v) => {
                const placa = (v.placa || "").trim().toUpperCase();
                const veces = placa ? conteoPlacas[placa] || 0 : 0;
                const reincidente = veces > 1;

                return (
                  <div key={v.id} style={styles.card}>
                    <div style={styles.cardHeader}>
                      <div style={styles.placa}>{v.placa || "Sin placa"}</div>

                      {reincidente && (
                        <div style={styles.badge}>⚠ Reincidente ({veces})</div>
                      )}
                    </div>

                    <div style={styles.detailGrid}>
                      <div><span style={styles.label}>Marca:</span> {v.marca || "-"}</div>
                      <div><span style={styles.label}>Modelo:</span> {v.modelo || "-"}</div>
                      <div><span style={styles.label}>Color:</span> {v.color || "-"}</div>
                      <div><span style={styles.label}>Tipo:</span> {v.tipo || "-"}</div>
                      <div><span style={styles.label}>Folio:</span> {v.folio || "-"}</div>
                      <div><span style={styles.label}>Fecha:</span> {v.fecha_evento || "-"}</div>
                      <div><span style={styles.label}>Zona:</span> {v.zona || "-"}</div>
                      <div><span style={styles.label}>Delito:</span> {v.delito || "-"}</div>
                      <div><span style={styles.label}>Banda:</span> {v.banda || "-"}</div>
                      <div><span style={styles.label}>Estatus:</span> {v.estatus || "-"}</div>
                      <div style={styles.detailFull}>
                        <span style={styles.label}>Observaciones:</span> {v.observaciones || "-"}
                      </div>
                      <div style={styles.detailFull}>
                        <span style={styles.label}>Palabras clave:</span> {v.palabras_clave || "-"}
                      </div>
                      <div style={styles.detailFull}>
                        <span style={styles.label}>Vínculos:</span> {v.vinculos || "-"}
                      </div>
                    </div>

                    <div style={styles.actions}>
                      <button onClick={() => verHistorial(v.placa)} style={styles.buttonInfo}>
                        Ver historial
                      </button>

                      {rol === "admin" && (
  <>
    <button
      onClick={() => editarVehiculo(v)}
      style={styles.buttonEdit}
    >
      Editar
    </button>

    <button
      onClick={() => eliminarVehiculo(v.id)}
      style={styles.buttonDanger}
    >
      Eliminar
    </button>
  </>
)}
                    </div>
                  </div>
                );
              })}

              {!loading && resultados.length === 0 && <p>No hay coincidencias.</p>}
            </div>
          </div>
        </div>

        {historialPlaca && (
          <div style={styles.historyPanel}>
            <div style={styles.historyHeader}>
              <h2 style={styles.panelTitle}>Historial de placa: {historialPlaca}</h2>
              <button onClick={cerrarHistorial} style={styles.buttonSecondary}>
                Cerrar historial
              </button>
            </div>

            {loadingHistorial ? (
              <p>Cargando historial...</p>
            ) : (
              <>
                <p>
                  <strong>Total de eventos:</strong> {historialEventos.length}
                </p>

                <div style={styles.cards}>
                  {historialEventos.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <div style={styles.detailGrid}>
                        <div><span style={styles.label}>ID:</span> {item.id}</div>
                        <div><span style={styles.label}>Marca:</span> {item.marca || "-"}</div>
                        <div><span style={styles.label}>Modelo:</span> {item.modelo || "-"}</div>
                        <div><span style={styles.label}>Color:</span> {item.color || "-"}</div>
                        <div><span style={styles.label}>Folio:</span> {item.folio || "-"}</div>
                        <div><span style={styles.label}>Fecha:</span> {item.fecha_evento || "-"}</div>
                        <div><span style={styles.label}>Zona:</span> {item.zona || "-"}</div>
                        <div><span style={styles.label}>Delito:</span> {item.delito || "-"}</div>
                        <div><span style={styles.label}>Banda:</span> {item.banda || "-"}</div>
                        <div style={styles.detailFull}>
                          <span style={styles.label}>Observaciones:</span> {item.observaciones || "-"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
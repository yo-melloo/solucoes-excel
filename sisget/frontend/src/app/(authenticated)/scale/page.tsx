"use client";

import { useState, useEffect } from "react";
import { 
  Calendar, 
  RefreshCcw, 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Bus,
  FileText,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface EscalaItem {
  id: number;
  diaSemana: string;
  data: string;
  garagem: string;
  carro: string;
  hrGaragem: string;
  hrSaida: string;
  origem: string;
  destino: string;
  motorista: string;
  linha: string;
  servico: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockEscala: EscalaItem[] = [
  { id: 1, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Imperatriz", carro: "1042", hrGaragem: "05:00", hrSaida: "05:45", origem: "Imperatriz", destino: "São Luís", motorista: "RAIMUNDO LIMA (081234)", linha: "Imperatriz x São Luís 05:45", servico: "LINHA" },
  { id: 2, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Imperatriz", carro: "1018", hrGaragem: "05:15", hrSaida: "06:00", origem: "Imperatriz", destino: "Belém", motorista: "CARLOS SOUZA (073891)", linha: "Imperatriz x Belém 06:00", servico: "LINHA" },
  { id: 3, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "São Luís", carro: "2031", hrGaragem: "05:45", hrSaida: "06:30", origem: "São Luís", destino: "Imperatriz", motorista: "ANTONIO ROCHA (088741)", linha: "São Luís x Imperatriz 06:30", servico: "LINHA" },
  { id: 4, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Imperatriz", carro: "1055", hrGaragem: "06:00", hrSaida: "06:30", origem: "Imperatriz", destino: "Petrobras", motorista: "JOSE FERREIRA (092011)", linha: "Fretado Petrobras 06:30", servico: "FRETAMENTO" },
  { id: 5, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Belém", carro: "3012", hrGaragem: "06:15", hrSaida: "07:00", origem: "Belém", destino: "Imperatriz", motorista: "MARCOS ALVES (066552)", linha: "Belém x Imperatriz 07:00", servico: "LINHA" },
  { id: 6, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Imperatriz", carro: "1042", hrGaragem: "17:15", hrSaida: "18:00", origem: "São Luís", destino: "Imperatriz", motorista: "MARCOS ALVES (066552)", linha: "São Luís x Imperatriz 18:00", servico: "LINHA" },
  { id: 7, diaSemana: "Quinta-feira", data: "16/04/2026", garagem: "Imperatriz", carro: "1031", hrGaragem: "18:45", hrSaida: "19:30", origem: "Belém", destino: "Imperatriz", motorista: "ANTONIO ROCHA (088741)", linha: "Belém x Imperatriz 19:30", servico: "LINHA" },
];

export default function ScalePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("16/04/2026 08:00");
  const [filteredEscala, setFilteredEscala] = useState(mockEscala);

  useEffect(() => {
    const filtered = mockEscala.filter(item => 
      item.motorista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.carro.includes(searchTerm) ||
      item.linha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.destino.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEscala(filtered);
  }, [searchTerm]);

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate API call to SharePoint
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date().toLocaleString('pt-BR', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      }));
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-xs font-bold text-muted uppercase tracking-widest">Módulo</p>
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
              Escala do Fluxo
            </h1>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isSyncing ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-emerald-500/10 text-emerald-500'}`}>
              {isSyncing ? (
                <>Sincronizando...</>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Sincronizado
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none mb-1">Última Sincronização</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{lastSync}</p>
          </div>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`btn-primary h-12 px-6 flex items-center gap-2 ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <RefreshCcw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            Sincronizar Agora
          </button>
        </div>
      </section>

      {/* Integration Info Card */}
      <section className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-blue-500">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Integração Escala do Fluxo</h3>
            <p className="text-muted text-xs mt-1">
              Sincronizado via SharePoint Corporativo. Use o botão ao lado para carregar uma planilha local (.xlsx) como fallback.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors bg-blue-500/5 px-4 py-2 rounded-lg cursor-pointer">
            <Plus className="w-3 h-3" />
            CARREGAR ARQUIVO LOCAL
            <input type="file" className="hidden" accept=".xlsx,.xls" onChange={(e) => {
              if (e.target.files?.[0]) {
                setIsSyncing(true);
                setTimeout(() => {
                  setIsSyncing(false);
                  setLastSync(new Date().toLocaleString('pt-BR'));
                  alert(`Arquivo ${e.target.files?.[0].name} carregado com sucesso! (Simulado)`);
                }, 1500);
              }
            }} />
          </label>
          <a 
            href="#" 
            className="flex items-center gap-2 text-xs font-bold text-muted hover:text-white transition-colors bg-[var(--secondary)] px-4 py-2 rounded-lg"
          >
            ABRIR SHAREPOINT
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 glass flex items-center gap-3 px-4 py-3 rounded-xl focus-within:border-blue-500/50 border border-[var(--border)] transition-all">
          <Search className="w-5 h-5 text-muted" />
          <input 
            type="text" 
            placeholder="Buscar por motorista, frota ou linha..." 
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-3 rounded-xl border border-[var(--border)] text-xs font-bold text-muted uppercase tracking-widest hover:bg-[var(--secondary)] transition-all">
            Filtros
          </button>
          <button className="glass px-4 py-3 rounded-xl border border-[var(--border)] text-xs font-bold text-muted uppercase tracking-widest hover:bg-[var(--secondary)] transition-all">
            Exportar
          </button>
        </div>
      </section>

      {/* Scale Table */}
      <section className="glass rounded-2xl overflow-hidden border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/50">
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Início / Saída</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Veículo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Base / Garagem</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Motorista</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Trecho / Linha</th>
                <th className="px-6 py-4 text-[10px] font-bold text-muted uppercase tracking-widest">Serviço</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredEscala.length > 0 ? (
                filteredEscala.map((item, idx) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[var(--secondary)] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          {item.hrSaida}
                        </div>
                        <div className="text-[10px] text-muted flex items-center gap-1">
                          <span className="font-bold">GARAGEM:</span> {item.hrGaragem}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-blue-500 border border-[var(--border)] group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                          <Bus className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black italic tracking-tighter" style={{ fontFamily: 'var(--font-outfit)' }}>{item.carro}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-muted" />
                        {item.garagem}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold leading-none mb-1">{item.motorista.split(' (')[0]}</span>
                          <span className="text-[10px] text-muted font-mono">{item.motorista.split(' (')[1].replace(')', '')}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 max-w-[240px]">
                        <span className="text-xs font-bold uppercase tracking-tight truncate">{item.linha}</span>
                        <div className="flex items-center gap-2 text-[10px] text-muted font-medium">
                          <span>{item.origem}</span>
                          <div className="w-4 h-px bg-[var(--border)]" />
                          <span>{item.destino}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black px-2 py-1 rounded border ${
                        item.servico === 'LINHA' 
                          ? 'border-blue-500/20 bg-blue-500/5 text-blue-500' 
                          : 'border-purple-500/20 bg-purple-500/5 text-purple-500'
                      }`}>
                        {item.servico}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <AlertCircle className="w-10 h-10" />
                      <p className="text-sm font-bold uppercase tracking-widest">Nenhum resultado encontrado</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer / Summary Info */}
      <section className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-widest">
        <span>Total de Saídas: {mockEscala.length}</span>
        <div className="w-1 h-1 rounded-full bg-muted" />
        <span>Imperatriz: {mockEscala.filter(i => i.garagem === 'Imperatriz').length}</span>
        <div className="w-1 h-1 rounded-full bg-muted" />
        <span>Outras Bases: {mockEscala.filter(i => i.garagem !== 'Imperatriz').length}</span>
      </section>
    </div>
  );
}

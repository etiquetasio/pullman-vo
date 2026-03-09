import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, RefreshCw, Database, ChefHat } from 'lucide-react';

// Webhook URLs
const ALERGENICOS_URL = 'https://n8n-railway.etiquetas.io/webhook/alergenicos-vo';
const CARGA_FULL_URL = 'https://n8n-railway.etiquetas.io/webhook/carga-full-vo';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface ActionState {
  status: Status;
  message: string;
}

export default function App() {
  const [alergenicosState, setAlergenicosState] = useState<ActionState>({ status: 'idle', message: '' });
  const [cargaFullState, setCargaFullState] = useState<ActionState>({ status: 'idle', message: '' });

  const triggerWebhook = async (url: string, setState: React.Dispatch<React.SetStateAction<ActionState>>) => {
    setState({ status: 'loading', message: 'Processando...' });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          triggeredBy: 'Airtable Extension'
        }),
      });

      if (response.ok) {
        setState({ status: 'success', message: 'Carga realizada com sucesso!' });
        setTimeout(() => setState({ status: 'idle', message: '' }), 5000);
      } else {
        throw new Error(`Erro: ${response.statusText}`);
      }
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : 'Erro desconhecido' });
      setTimeout(() => setState({ status: 'idle', message: '' }), 8000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6 font-sans text-[#1a1a1a]">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Painel de Carga VO</h1>
          <p className="text-sm text-[#9e9e9e]">Gerencie a sincronização de dados com o n8n.</p>
        </header>

        {/* Action Cards */}
        <div className="space-y-4">
          {/* Carga Alergênicos */}
          <motion.div 
            className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium">Carga de Alergênicos</h3>
                  <p className="text-xs text-[#9e9e9e]">Sincroniza a lista de alérgenos.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerWebhook(ALERGENICOS_URL, setAlergenicosState)}
              disabled={alergenicosState.status === 'loading'}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                alergenicosState.status === 'loading' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#1a1a1a] text-white hover:bg-black active:scale-[0.98]'
              }`}
            >
              {alergenicosState.status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              CARGA DE ALERGÊNICOS
            </button>

            <AnimatePresence>
              {alergenicosState.status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-xs p-3 rounded-lg flex items-center gap-2 ${
                    alergenicosState.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 
                    alergenicosState.status === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {alergenicosState.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {alergenicosState.status === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
                  {alergenicosState.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Carga Full Pratos */}
          <motion.div 
            className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 flex flex-col gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ChefHat className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Carga Full Pratos</h3>
                  <p className="text-xs text-[#9e9e9e]">Sincronização completa do cardápio.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerWebhook(CARGA_FULL_URL, setCargaFullState)}
              disabled={cargaFullState.status === 'loading'}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                cargaFullState.status === 'loading' 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#1a1a1a] text-white hover:bg-black active:scale-[0.98]'
              }`}
            >
              {cargaFullState.status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              CARGA FULL PRATOS
            </button>

            <AnimatePresence>
              {cargaFullState.status !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-xs p-3 rounded-lg flex items-center gap-2 ${
                    cargaFullState.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 
                    cargaFullState.status === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {cargaFullState.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {cargaFullState.status === 'error' && <AlertCircle className="w-3.5 h-3.5" />}
                  {cargaFullState.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Info */}
        <footer className="text-center">
          <p className="text-[10px] text-[#9e9e9e] uppercase tracking-widest">
            v1.0.0 • Conectado a n8n-railway
          </p>
        </footer>
      </div>
    </div>
  );
}

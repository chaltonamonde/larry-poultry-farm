import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Egg,
  ShieldCheck,
  Flame,
  Wheat,
  Activity,
  Edit2,
  Save
} from 'lucide-react';
import { ChickBatch } from '../../types';

export const HatcheryFlockTab: React.FC = () => {
  const { chickBatches, updateChickBatch, flockMetrics, updateFlockMetrics } = useAdmin();

  const [editingBatchId, setEditingBatchId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<ChickBatch['status']>('open');

  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [tempEggsCollected, setTempEggsCollected] = useState(flockMetrics.eggsCollectedTodayCrates);
  const [tempLayRate, setTempLayRate] = useState(flockMetrics.layingRatePercent);
  const [tempFeedBags, setTempFeedBags] = useState(flockMetrics.feedStockBags);
  const [tempBrooderTemp, setTempBrooderTemp] = useState(flockMetrics.brooderTempCelsius);

  const handleStartEditBatch = (batch: ChickBatch) => {
    setEditingBatchId(batch.id);
    setEditQty(batch.availableQty);
    setEditPrice(batch.pricePerChickKes);
    setEditStatus(batch.status);
  };

  const handleSaveBatch = (batchId: string) => {
    updateChickBatch(batchId, {
      availableQty: editQty,
      pricePerChickKes: editPrice,
      status: editStatus
    });
    setEditingBatchId(null);
  };

  const handleSaveMetrics = () => {
    updateFlockMetrics({
      eggsCollectedTodayCrates: tempEggsCollected,
      layingRatePercent: tempLayRate,
      feedStockBags: tempFeedBags,
      brooderTempCelsius: tempBrooderTemp
    });
    setIsEditingMetrics(false);
  };

  const vaccinationProtocols = [
    { day: 'Day 1 (Hatchery)', name: "Marek's Disease (Subcutaneous injection)", status: 'Administered at Hatchery' },
    { day: 'Day 7', name: 'Gumboro (IBD) Intermediate Plus (Drinking Water)', status: 'Due Tomorrow - Batch #KB-402' },
    { day: 'Day 14', name: 'Newcastle (ND) + Infectious Bronchitis (Lasota)', status: 'Scheduled' },
    { day: 'Day 21', name: 'Gumboro (IBD) 2nd Booster', status: 'Scheduled' },
    { day: 'Day 28', name: 'Lasota Booster (Eye Drop / Water)', status: 'Scheduled' },
    { day: 'Week 6', name: 'Fowl Pox Wing Web Stab', status: 'Scheduled' },
    { day: 'Week 8', name: 'Fowl Typhoid (Subcutaneous)', status: 'Scheduled' },
    { day: 'Week 16', name: 'Deworming + Newcastle Oil Emulsion Booster', status: 'Scheduled' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Flock Vital Indicators */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '16px'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Egg size={15} color="#eab308" />
            <span>DAILY EGG HARVEST</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#eab308', marginTop: '4px' }}>
            {flockMetrics.eggsCollectedTodayCrates} Crates
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>{flockMetrics.layingRatePercent}%</strong> Flock Laying Rate ({flockMetrics.layersTotal.toLocaleString()} Hens)
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Activity size={15} color="var(--primary-green)" />
            <span>BROILER HEALTH & WEIGHT</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-green)', marginTop: '4px' }}>
            {flockMetrics.broilersAvgWeightKg} kg Avg
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Mortality: <strong>{flockMetrics.mortalityRatePercent}%</strong> (Target &lt; 2.5%)
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Flame size={15} color="var(--accent-amber)" />
            <span>BROODER TEMPERATURE</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)', marginTop: '4px' }}>
            {flockMetrics.brooderTempCelsius}°C
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Optimal chick target: 32°C - 35°C
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Wheat size={15} color="var(--accent-sky)" />
            <span>FEED STOCK RESERVES</span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-sky)', marginTop: '4px' }}>
            {flockMetrics.feedStockBags} Bags
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Estimated 14 days runway in dry storage
          </div>
        </div>
      </div>

      {/* Quick Daily Flock Metric Editor */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
            Daily Flock & Feed Observation Log
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Update today's egg collection crates and brooder room readings
          </div>
        </div>

        {isEditingMetrics ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Eggs (Crates):
              <input
                type="number"
                value={tempEggsCollected}
                onChange={(e) => setTempEggsCollected(parseInt(e.target.value) || 0)}
                style={{ width: '70px', marginLeft: '4px', padding: '4px 6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
              />
            </label>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Lay %:
              <input
                type="number"
                step="0.1"
                value={tempLayRate}
                onChange={(e) => setTempLayRate(parseFloat(e.target.value) || 0)}
                style={{ width: '70px', marginLeft: '4px', padding: '4px 6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
              />
            </label>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Feed Bags:
              <input
                type="number"
                value={tempFeedBags}
                onChange={(e) => setTempFeedBags(parseInt(e.target.value) || 0)}
                style={{ width: '70px', marginLeft: '4px', padding: '4px 6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
              />
            </label>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Brooder °C:
              <input
                type="number"
                step="0.5"
                value={tempBrooderTemp}
                onChange={(e) => setTempBrooderTemp(parseFloat(e.target.value) || 0)}
                style={{ width: '70px', marginLeft: '4px', padding: '4px 6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
              />
            </label>
            <button
              type="button"
              onClick={handleSaveMetrics}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <Save size={14} /> Save Log
            </button>
            <button
              type="button"
              onClick={() => setIsEditingMetrics(false)}
              className="btn btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 10px' }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditingMetrics(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px 14px' }}
          >
            <Edit2 size={14} /> Update Daily Readings
          </button>
        )}
      </div>

      {/* Incubator Batches & Hatch Calendar Manager */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(16px, 3vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Incubator Setter & Hatcher Batches
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            Automated 21-day incubation calendar with live pre-order allocations
          </p>
        </div>

        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-section-alt)', borderBottom: '1px solid var(--border-card)' }}>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Batch ID</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Breed & Line</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hatch Date</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Qty</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Price / Chick</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hatch Status</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {chickBatches.map((batch) => {
                const isEditing = editingBatchId === batch.id;
                return (
                  <tr key={batch.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      {batch.id}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {batch.breedName}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {batch.notes}
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '0.84rem', color: 'var(--accent-sky)', fontWeight: 600 }}>
                      {batch.hatchDateFormatted}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editQty}
                          onChange={(e) => setEditQty(parseInt(e.target.value) || 0)}
                          style={{ width: '80px', padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          {batch.availableQty.toLocaleString()} chicks
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                          style={{ width: '80px', padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
                        />
                      ) : (
                        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary-green)' }}>
                          KES {batch.pricePerChickKes}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      {isEditing ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as any)}
                          style={{ padding: '6px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: '4px', color: '#fff', fontSize: '16px' }}
                        >
                          <option value="open">Open (Available)</option>
                          <option value="few-left">Few Left</option>
                          <option value="sold-out">Sold Out</option>
                        </select>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor:
                              batch.status === 'open'
                                ? 'rgba(34, 197, 94, 0.15)'
                                : batch.status === 'few-left'
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color:
                              batch.status === 'open'
                                ? 'var(--primary-green)'
                                : batch.status === 'few-left'
                                ? 'var(--accent-amber)'
                                : 'var(--accent-red)',
                            textTransform: 'capitalize'
                          }}
                        >
                          {batch.status.replace('-', ' ')}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => handleSaveBatch(batch.id)}
                            className="btn-primary"
                            style={{ fontSize: '0.75rem', padding: '5px 8px' }}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingBatchId(null)}
                            className="btn btn-secondary"
                            style={{ fontSize: '0.75rem', padding: '5px 8px' }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEditBatch(batch)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent-sky)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kenya Poultry 0-18 Week Biosecurity & Vaccination Protocol */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(16px, 3vw, 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="var(--primary-green)" />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Official Kenya Vaccination Protocol (0 - 18 Weeks)
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Supervised by Resident Veterinary Surgeon Dr. Omondi. Mandatory for all breeding stock dispatched from Ruiru.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '10px' }}>
          {vaccinationProtocols.map((vax, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-section-alt)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--accent-sky)', fontWeight: 700 }}>
                <span>{vax.day}</span>
                <span style={{ color: vax.status.includes('Tomorrow') ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
                  {vax.status}
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                {vax.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

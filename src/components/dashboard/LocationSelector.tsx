"use client";

import { useState, useEffect } from 'react';
import { Loader2, MapPin, CheckCircle2 } from 'lucide-react';

interface Location {
    name: string; // resource name e.g. locations/123
    title: string;
    storeCode?: string;
}

interface LocationSelectorProps {
    onSelect: (location: Location) => void;
    currentLocationId?: string;
}

export default function LocationSelector({ onSelect, currentLocationId }: LocationSelectorProps) {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch('/api/google/locations');
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setLocations(data.locations || []);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center p-8 space-x-2 text-gray-500">
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Fetching your business locations...</span>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            Error: {error}
        </div>
    );

    if (locations.length === 0) return (
        <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            No business locations found. Please ensure you have locations in your Google Business Profile.
        </div>
    );

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">Select a Location to Manage</h3>
            <div className="grid gap-3">
                {locations.map((loc) => (
                    <button
                        key={loc.name}
                        onClick={() => onSelect(loc)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all text-left group ${currentLocationId === loc.name
                                ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500'
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${currentLocationId === loc.name ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{loc.title}</div>
                                {loc.storeCode && <div className="text-xs text-gray-500">Store Code: {loc.storeCode}</div>}
                            </div>
                        </div>
                        {currentLocationId === loc.name && (
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

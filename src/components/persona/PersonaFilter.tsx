"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PERSONA_LIST, getPersona } from '@/lib/personas';
import { Filter, X, Users } from 'lucide-react';
import { useState } from 'react';

interface PersonaFilterProps {
    selectedPersona: string | null;
    onPersonaChange: (personaId: string | null) => void;
    reportCounts?: Record<string, number>;
    totalReports?: number;
    className?: string;
}

export default function PersonaFilter({
    selectedPersona,
    onPersonaChange,
    reportCounts = {},
    totalReports = 0,
    className
}: PersonaFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedPersonaObj = getPersona(selectedPersona as any);

    const handlePersonaSelect = (personaId: string | null) => {
        onPersonaChange(personaId);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Filter Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 px-3 text-xs font-medium gap-2 border-gray-200"
            >
                <Filter size={12} />
                {selectedPersonaObj ? (
                    <div className="flex items-center gap-1">
                        <selectedPersonaObj.icon size={12} style={{ color: selectedPersonaObj.color }} />
                        <span>{selectedPersonaObj.label}</span>
                    </div>
                ) : (
                    'All Personas'
                )}
                {selectedPersona && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePersonaSelect(null);
                        }}
                        className="ml-1 hover:bg-gray-100 rounded-full p-0.5"
                    >
                        <X size={10} />
                    </button>
                )}
            </Button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown Content */}
                    <Card className="absolute top-full left-0 mt-2 w-72 p-3 shadow-lg border z-20">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Filter by Persona
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* All Reports Option */}
                            <button
                                onClick={() => handlePersonaSelect(null)}
                                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                                    !selectedPersona 
                                        ? 'bg-gray-100 border border-gray-200' 
                                        : 'hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                                        <Users size={12} className="text-gray-500" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        All Reports
                                    </span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {totalReports}
                                </Badge>
                            </button>

                            {/* Persona Options */}
                            <div className="space-y-1">
                                {PERSONA_LIST.map((persona) => {
                                    const PersonaIcon = persona.icon;
                                    const count = reportCounts[persona.id] || 0;
                                    const isSelected = selectedPersona === persona.id;

                                    return (
                                        <button
                                            key={persona.id}
                                            onClick={() => handlePersonaSelect(persona.id)}
                                            disabled={count === 0}
                                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                                                isSelected
                                                    ? 'border border-gray-200'
                                                    : count > 0 
                                                        ? 'hover:bg-gray-50' 
                                                        : 'opacity-50 cursor-not-allowed'
                                            } ${isSelected ? 'bg-gray-50' : ''}`}
                                            style={isSelected ? { 
                                                backgroundColor: `${persona.color}08`,
                                                borderColor: `${persona.color}30`
                                            } : {}}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div 
                                                    className="w-6 h-6 rounded-md flex items-center justify-center"
                                                    style={{ backgroundColor: `${persona.color}15` }}
                                                >
                                                    <PersonaIcon 
                                                        size={12} 
                                                        style={{ color: persona.color }} 
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {persona.label}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {persona.description}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge 
                                                variant={count > 0 ? "secondary" : "outline"} 
                                                className="text-xs"
                                            >
                                                {count}
                                            </Badge>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* No Results Message */}
                            {selectedPersona && (reportCounts[selectedPersona] || 0) === 0 && (
                                <div className="text-center py-4 text-sm text-gray-500">
                                    No reports found for {selectedPersonaObj?.label}
                                    <br />
                                    <button
                                        onClick={() => handlePersonaSelect(null)}
                                        className="text-primary hover:underline mt-1"
                                    >
                                        Show all reports
                                    </button>
                                </div>
                            )}
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
}
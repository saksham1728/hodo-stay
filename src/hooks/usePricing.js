import { useState, useEffect } from 'react';
import { pricingService } from '../api/pricing/pricingService';

export const usePricing = (unitId, checkIn, checkOut, guests = 2) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPriceQuote = async () => {
    if (!unitId || !checkIn || !checkOut) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await pricingService.getPriceQuote(unitId, checkIn, checkOut, guests);
      
      // Handle the response structure correctly
      if (response.success && response.data && response.data.quote) {
        setQuote(response.data.quote);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to get price quote');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch when dependencies change
  useEffect(() => {
    fetchPriceQuote();
  }, [unitId, checkIn, checkOut, guests]);

  return {
    quote,
    loading,
    error,
    refetch: fetchPriceQuote
  };
};

export const useAvailability = (unitId, month, year) => {
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailability = async () => {
    if (!unitId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await pricingService.getAvailability(unitId, month, year);
      setAvailability(response.data.availability);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get availability');
      setAvailability(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [unitId, month, year]);

  return {
    availability,
    loading,
    error,
    refetch: fetchAvailability
  };
};
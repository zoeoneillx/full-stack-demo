'use strict';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Formats an ISO date string (YYYY-MM-DD) as "D Mon YYYY".
 *
 * @example
 *   formatDate('2026-07-20') // → '20 Jul 2026'
 *   formatDate('2024-01-01') // → '1 Jan 2024'
 *
 * @param {string} isoDate - A date string in YYYY-MM-DD format.
 * @returns {string}
 */
function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

module.exports = { formatDate };

export const LOGIN_INITIAL_STATE = {
  email: '',
  password: '',
}

export const PASSWORD_RESET_INITIAL_STATE = {
  email: '',
}

export const PASSWORD_INITIAL_STATE = {
  password: '',
  password_confirmed: '',
}

export const PAGINATION_INITIAL_STATE = {
  count: 0,
  next: '',
  previous: ''
}

export const PAGE_LIMIT = 3

export const API_KEYS_INITIAL_STATE = {
  client_id: '',
  client_secret: '',
  plugin_key: '',
  is_sandbox_mode: false
}

export const FORMAT_MONEY_FIELDS = [
  'base_pay',
  'overtime',
  'commission',
  'bonuses',
  'gross_pay',
  'taxes',
  'deductions',
  'net_pay',
  'gross_monthly',
  'gross_monthly_with_last_year'
]

export const RATE_FIELDS = [
  'base_pay',
  'rate_of_pay',
]

const total_days = (termination_date) => (
  "V1/employments/termination_datetime\n" +
  "V1/employments/hire_datetime\n\n" +
  `${termination_date} - hire date`
);
const hours_per_week = (period) => (
  "V1/employments/termination_datetime\n" +
  "V1/employments/hire_datetime\n" +
  "V1/payouts/hours\n\n" +
  "total_days = Termination Datetime - Hire Datetime\n" +
  "total_weeks = total_days / 7\n" +
  `Hours Per Week = sum of ${period} payouts.hours / total_weeks`
);
const pay_frequency = (
  "V1/payouts/payout_date\n\n" +
  "Average period between paychecks"
);
const rate_of_pay = (period) => (
  "V1/payouts/gross_pay\n" +
  "V1/payouts/hours\n\n" +
  `${period} gross pay / sum of ${period} payouts.hours`
);
const base_pay = (period) => (
  "V1/payouts/gross_pay\n" +
  "V1/payouts/bonuses\n" +
  "V1/payouts/reimbursements\n" +
  "V1/payouts/overtime\n\n" +
  `Sum of ${period} payouts.gross_pay - bonuses - reimbursements - overtime`
);
const overtime = (
  "V1/payouts/overtime\n\n" +
  "Overtime"
);
const commission = (
  "V1/payouts/commission\n\n" +
  "Commission"
);
const bonuses = (
  "V1/payouts/bonuses\n\n" +
  "Bonuses"
);
const reimbursements = (
  "V1/payouts/reimbursements\n\n" +
  "Reimbursements"
);
const gross_pay = (period) => (
  "V1/payouts/gross_pay\n\n" +
  `Sum of ${period} payouts.gross_pay`
);
const net_pay = (period) => (
  "V1/payouts/net_pay\n\n" +
  `Sum of ${period} payouts.net_pay`
);
const taxes = (period) => (
  "V1/payouts/taxes\n\n" +
  `Sum of ${period} payouts.taxes`
);
const deductions = (period) => (
  "V1/payouts/deductions\n\n" +
  `Sum of ${period} payouts.deductions`
);
const gross_monthly = (period, num_months) => (
  "V1/payouts/gross_pay\n\n" +
  `Sum of ${period} payouts.gross_pay / ${num_months}`
);
const gross_monthly_with_last_year = (formula) => (
  "V1/payouts/gross_pay\n\n" + formula
);


export const CALCULATION_TOOLTIPS = {
  "total_days": {
    "last_year_total": total_days("Termination date"),
    "ytd_total": total_days("Today"),
    "projected_total": "YTD value * 12 / current month",
    "companies": {
      "last_year_total": total_days("Termination date"),
    "ytd_total": total_days("Today"),
    "projected_total": "YTD value * 12 / current month",
    }
  },
  "pay_frequency": {
    "last_year_total": pay_frequency,
    "ytd_total": pay_frequency,
    "projected_total": "YTD value",
    "companies": {
      "last_year_total": pay_frequency,
      "ytd_total": pay_frequency,
      "projected_total": "YTD value",
    }
  },
  "rate_of_pay": {
    "last_year_total": rate_of_pay("Last Year's"),
    "ytd_total": rate_of_pay("YTD"),
    "projected_total": "YTD value",
    "companies": {
      "last_year_total": rate_of_pay("Last Year's"),
      "ytd_total": rate_of_pay("YTD"),
      "projected_total": "YTD value",
    }
  },
  "base_pay": {
    "last_year_total": base_pay("Last Year's"),
    "ytd_total": base_pay("YTD"),
    "projected_total": "YTD value * 12 / current month",
    "companies": {
      "last_year_total": base_pay("Last Year's"),
      "ytd_total": base_pay("YTD"),
      "projected_total": "YTD value * 12 / current month",
    }
  },
  "overtime": {
    "last_year_total": overtime,
    "ytd_total": overtime,
    "projected_total": "YTD overtime * 12 / current month",
    "companies": {
      "last_year_total": overtime,
      "ytd_total": overtime,
      "projected_total": "YTD overtime * 12 / current month",
    }
  },
  "commission": {
    "last_year_total": commission,
    "ytd_total": commission,
    "projected_total": "YTD commission * 12 / current month",
    "companies": {
      "last_year_total": commission,
      "ytd_total": commission,
      "projected_total": "YTD commission * 12 / current month",
    }
  },
  "bonuses": {
    "last_year_total": bonuses,
    "ytd_total": bonuses,
    "projected_total": "YTD bonuses * 12 / current month",
    "companies": {
      "last_year_total": bonuses,
      "ytd_total": bonuses,
      "projected_total": "YTD bonuses * 12 / current month",
    }
  },
  "reimbursements": {
    "last_year_total": reimbursements,
    "ytd_total": reimbursements,
    "projected_total": "YTD reimbursements * 12 / current month",
    "companies": {
      "last_year_total": reimbursements,
      "ytd_total": reimbursements,
      "projected_total": "YTD reimbursements * 12 / current month",
    }
  },
  "gross_pay": {
    "last_year_total": gross_pay("Last Year's"),
    "ytd_total": gross_pay("YTD"),
    "projected_total": "YTD gross pay * 12 / current month",
    "companies": {
      "last_year_total": gross_pay("Last Year's"),
      "ytd_total": gross_pay("YTD"),
      "projected_total": "YTD gross pay * 12 / current month",
    }
  },
  "net_pay": {
    "last_year_total": net_pay("Last Year's"),
    "ytd_total": net_pay("YTD"),
    "projected_total": "YTD net pay * 12 / current month",
    "companies": {
      "last_year_total": net_pay("Last Year's"),
      "ytd_total": net_pay("YTD"),
      "projected_total": "YTD net pay * 12 / current month",
    }
  },
  "taxes": {
    "last_year_total": taxes("Last Year's"),
    "ytd_total": taxes("YTD"),
    "projected_total": "YTD taxes * 12 / current month",
    "companies": {
      "last_year_total": taxes("Last Year's"),
      "ytd_total": taxes("YTD"),
      "projected_total": "YTD taxes * 12 / current month",
    }
  },
  "gross_monthly_with_last_year": {
    "last_year_total": gross_monthly_with_last_year("gross pay / 12"),
    "ytd_total": gross_monthly_with_last_year("(last year gross pay + gross pay) / (12 + current month)"),
    "projected_total": "YTD value",
    "companies": {
      "last_year_total": gross_monthly_with_last_year("gross pay / 12"),
      "ytd_total": gross_monthly_with_last_year("(last year gross pay + gross pay) / (12 + current month)"),
      "projected_total": "YTD value",
    }
  },
  "hours_per_week": {
    "last_year_total": hours_per_week("Last Year's"),
    "ytd_total": hours_per_week("YTD"),
    "projected_total": "YTD value",
    "companies": {
      "last_year_total": hours_per_week("Last Year's"),
      "ytd_total": hours_per_week("YTD"),
      "projected_total": "YTD value",
    }
  },
  "gross_monthly": {
    "last_year_total": gross_monthly("Last Year's", 12),
    "ytd_total": gross_monthly("YTD", "current month"),
    "projected_total": "YTD total",
    "companies": {
      "last_year_total": gross_monthly("Last Year's", 12),
      "ytd_total": gross_monthly("YTD", "current month"),
      "projected_total": "YTD total",
    }
  },
  "deductions": {
    "last_year_total": deductions("Last Year's"),
    "ytd_total": deductions("YTD"),
    "projected_total": "YTD deductions * 12 / current month",
    "companies": {
      "last_year_total": deductions("Last Year's"),
      "ytd_total": deductions("YTD"),
      "projected_total": "YTD deductions * 12 / current month",
    }
  },
}


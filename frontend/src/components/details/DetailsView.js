import React, {useEffect, useState} from "react";
import {BasicContainer} from "../common/BasicContainer";
import "../stylesheets/styles-details.css"
import "../stylesheets/styles-global.css"
import {PAGINATION_INITIAL_STATE} from "../../consts"
import {Grid, Typography} from "@material-ui/core";
import {EmploymentsTable} from "./partials/EmploymentsTable";
import {Chart} from "./partials/Chart";
import {useHistory, useParams} from "react-router-dom";
import {
  displayErrorNotifications,
  renderNotification
} from "../utils/notifications";
import {UsersService} from "../../services/UsersService";
import {formatMoney, formatPhoneNumber} from "../utils/formatting";
import {ProgressContainer} from "../common/ProgressContainer";
import {getUserInitials} from "../utils/general";
import {ReactComponent as LeftArrow} from "../../icons/left-arrow.svg";
import {ReactComponent as IndicatorUp} from "../../icons/indicator-up.svg";
import {ReactComponent as IndicatorDown} from "../../icons/indicator-down.svg";
import {IncomeMetricsTable} from "./partials/IncomeMetricsTable";
import moment from "moment";

export const DetailsView = () => {
  const [userProfileData, setUserProfileData] = useState(null)
  const [userEmploymentsData, setEmploymentsData] = useState(null)
  const [userIncomeMetrics, setUserIncomeMetrics] = useState(null)
  const [paginationState, setPaginationState] = useState(PAGINATION_INITIAL_STATE)
  const [monthMetrics, setMonthMetrics] = useState(null) // data for chart
  const {argyle_id} = useParams();
  const history = useHistory()

  const loadUserData = () => {
    UsersService.fetchUserProfileData(argyle_id).then(response => {
      setUserProfileData(response.data)
      loadEmploymentsList()
      loadMetrics()
    }).catch(error => {
      history.push("/users/")

      if (error?.response?.status === 404) {
        renderNotification("No data.", "error");
        history.push("/users/")
        return
      }
      displayErrorNotifications(error)
    })

  }

  const loadMetrics = () => {
    UsersService.fetchUserKeyMetricsData(argyle_id).then(response => {
      const {income_metrics, month_metrics} = response.data
      setUserIncomeMetrics(income_metrics)
      setMonthMetrics(month_metrics)
    }).catch(error => displayErrorNotifications(error))
  }

  const loadEmploymentsList = (url = null) => {
    const action = url ? UsersService.fetchUserEmploymentsDataByUrl(url) : UsersService.fetchUserEmploymentsData(argyle_id)

    action.then(response => {
      const {count, next, previous, results} = response.data
      setPaginationState({count, next, previous})
      setEmploymentsData(results)
    }).catch(error => displayErrorNotifications(error))
  }

  const loadNextPage = () => {
    loadEmploymentsList(paginationState.next)

  }
  const loadPrevPage = () => {
    loadEmploymentsList(paginationState.previous)
  }

  const goBack = () => {
    history.push("/users/");
  }

  const displayIndicator = () => {
    const curr_month_idx = moment().month();
    const prev_month_last_year = monthMetrics["LAST_YEAR"][curr_month_idx - 1];
    const prev_month_income = monthMetrics["CURRENT_YEAR"][curr_month_idx - 1];

    if (prev_month_income > prev_month_last_year) {
      return <IndicatorUp className="indicator"/>;
    } else if (prev_month_income < prev_month_last_year) {
      return <IndicatorDown className="indicator"/>;
    }
  }

  useEffect(loadUserData, [])

  if (!userProfileData || !userEmploymentsData || !userIncomeMetrics) {
    return <ProgressContainer/>
  }
  return (
    <div className="details-container">
      <Grid container direction="column">
        <Grid item>
          <Grid container>
            <Grid item md={8} className="flex">
              <div className="button" onClick={goBack}>
                <LeftArrow width={50} height={22}/>
              </div>
              <span className="purple-initials">
                {getUserInitials(userProfileData.full_name)}
              </span>
              <span className="font-bold">
                {userProfileData.full_name}
              </span>
            </Grid>
            <Grid item md={4} className="personal-info">
              <span>
                <span style={{color: "#989898"}}>
                  DOB:
                </span> {userProfileData.birth_date}
              </span>
              <span>{userProfileData.email}</span>
              <span>{formatPhoneNumber(userProfileData.phone_number)}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <BasicContainer extraCssClass="tile">
              <Chart data={monthMetrics}/>
            </BasicContainer>

            <BasicContainer extraCssClass="tile">
              <Typography variant="h5" className="font-bold">
                Employment History
              </Typography>
              <EmploymentsTable
                data={userEmploymentsData}
                count={paginationState.count}
                loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}
              />
            </BasicContainer>
          </Grid>
          <Grid item md={4}>
            <Grid container className="tile">
              <Grid item xs={6}>
                <div className={"total-metric"}>
                  <div className="font-size-mini">
                    Last Year Total Income
                  </div>
                  <div
                    className="font-size-large font-bold">
                    {formatMoney(userIncomeMetrics.gross_pay.last_year_total)}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={"total-metric"}>
                  <div className="font-size-mini">
                    Current Year Projected Income
                  </div>
                  <div
                    className="font-size-large font-bold flex">
                    {formatMoney(userIncomeMetrics.gross_pay.projected_total)}
                    {displayIndicator()}
                  </div>
                </div>
              </Grid>
            </Grid>
            <BasicContainer extraCssClass="tile">
              <Typography variant="h5" className="font-bold">
                Income Metrics
              </Typography>
              <IncomeMetricsTable
                data={userIncomeMetrics}
                count={paginationState.count}
                loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}
              />
            </BasicContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

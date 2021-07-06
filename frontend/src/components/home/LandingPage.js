import {Button, Card, Grid} from "@material-ui/core";
import React, {useEffect} from "react";
import {TopNavBar} from "./TopNavBar";
import "../stylesheets/styles-landing-page.css";
import {ReactComponent as Next} from "../../icons/next.svg";
import {ReactComponent as RightArrowWhite} from "../../icons/right-arrow-white.svg";
import Laptop from "../../images/laptop.png";
import HistoricalIncomeSummary
  from "../../images/historical-income-summary.png";
import FutureIncomeProjections
  from "../../images/future-income-projections.png";
import InstantDecisioningLogic
  from "../../images/instant-decisioning-logic.png";
import ReduceDevelopmentTime from "../../images/reduce-development-time.png";
import {Footer} from "./Footer";


export const LandingPage = () => {
  useEffect(() => {
    // Anything in here is fired on component mount.
    document.body.style.backgroundColor = "white";
    document.body.style.margin = "0px";
    return () => {
      // Anything in here is fired on component unmount.
      document.body.style.backgroundColor = "#F2F6F9";
      document.body.style.margin = "25px";
    }
  }, []);

  return (
    <>
      <TopNavBar/>

      <Grid container className="banner">
        <Grid item xs={12} sm={12} md={5} className="banner-headline">
          <span className="title">
            Argyle Calculator
          </span>
          <span className="sub-title">
            Leverage Argyle’s calculator to get a holistic picture of your
            customers’ past income and projected earnings.
          </span>
          <a href="/auth/login">
            <Button
              variant="contained"
              color="primary">
              Log In to Argyle Calculator
              <RightArrowWhite style={{marginLeft: 10}}/>
            </Button>
          </a>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <img src={Laptop} style={{width: "100%"}}/>
        </Grid>
      </Grid>

      <div className="tutorial">
        <span className="sub-headline">
          Add users
        </span>
        <Next/>
        <span className="sub-headline">
          Visualize their income metrics & employment history
        </span>
        <Next/>
        <span className="sub-headline">
          Project future income
        </span>
        <Next/>
        <span className="sub-headline">
          Conduct calculations<br/> on their data
        </span>
      </div>

      <div className="features">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <div className="card-left">
                  <span className="headline">
                    Earnings overview
                  </span>
                <span className="margin-top-25 sub-headline">
                    Calculator allows an underwriting agent to get a picture of
                    a person’s consolidated earnings history in a single view.
                  </span>
              </div>
              <div className="card-right">
                <img src={HistoricalIncomeSummary} alt=""/>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <div className="card-left">
                  <span className="headline">
                    Income forecast
                  </span>
                <span className="margin-top-25 sub-headline">
                    Project future income from historical data. Instantly calculate income amounts, ratios and time employed.
                  </span>
              </div>
              <div className="card-right">
                <img src={FutureIncomeProjections} alt=""/>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <div className="card-left">
                  <span className="headline">
                    Quicker decisions
                  </span>
                <span className="margin-top-25 sub-headline">
                    Instantly make underwriting decisions without the hassle of coding calculations yourself.
                  </span>
              </div>
              <div className="card-right">
                <img src={InstantDecisioningLogic} alt=""/>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="card">
              <div className="card-left">
                  <span className="headline">
                    Less dev time
                  </span>
                <span className="margin-top-25 sub-headline">
                    Take a load of your engineering team with this pre-built solution.
                  </span>
              </div>
              <div className="card-right">
                <img src={ReduceDevelopmentTime} alt=""/>
              </div>
            </Card>
          </Grid>
        </Grid>

        <Grid container>
          <a href="/auth/login" style={{margin: "4em auto"}}>
            <Button
              variant="contained"
              color="primary">
              Log In to Argyle Calculator
              <RightArrowWhite style={{marginLeft: 10}}/>
            </Button>
          </a>
        </Grid>

        <Footer/>
      </div>
    </>
  );
}

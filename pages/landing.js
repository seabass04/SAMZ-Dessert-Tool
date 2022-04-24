import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia'
import Typography from "@mui/material/Typography";

import styles from "../styles/landing.module.css";

export default function landing() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>
          UCR Irrigation and Water Management Tool Suite
        </h1>
      </div>

    </div>
  );
}

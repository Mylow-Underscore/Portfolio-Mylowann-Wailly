import * as React from "react";
import {Html, Head, Preview, Body, Container} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
};

interface DevisEmailProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
}

const DevisEmail: React.FC<DevisEmailProps> = ({ name, email, phone, service, description, budget }) => {
  
    return (
      <html>
        <head>
          <meta content="width=device-width" name="viewport" />
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta content="IE=edge" http-equiv="X-UA-Compatible" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
        </head>
        <Preview>Demande de devis {name}</Preview>
        <body>
          <div
            style={{
              display: "none",
              overflow: "hidden",
              lineHeight: "1px",
              opacity: 0,
              maxHeight: 0,
              maxWidth: 0,
            }}
            data-skip-in-text="true"
          >
            Prise Contact
            <div></div>
          </div>

          <table
            border={0}
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            role="presentation"
            align="center"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    width="100%"
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    role="presentation"
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                      fontSize: "1.0769230769230769em",
                      minHeight: "100%",
                      lineHeight: "155%",
                      backgroundColor: "#ababab91",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            width="100%"
                            border={0}
                            cellPadding={0}
                            cellSpacing={0}
                            role="presentation"
                            style={{
                              width: "100%",
                              paddingLeft: 0,
                              paddingRight: 0,
                              lineHeight: "155%",
                              maxWidth: 600,
                              fontFamily:
                                "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <h1
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "2.25em",
                                      lineHeight: "1.44em",
                                      paddingTop: "0.389em",
                                      fontWeight: 600,
                                      textAlign: "center",
                                    }}
                                  >
                                    <span>Nouvelle Prise de Contacte de {name}</span>
                                  </h1>

                                  <h3
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1.4em",
                                      lineHeight: "1.08em",
                                      paddingTop: "0.389em",
                                      fontWeight: 600,
                                      textAlign: "left",
                                    }}
                                  >
                                    <span> </span>
                                  </h3>

                                  <h3
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1.4em",
                                      lineHeight: "1.08em",
                                      paddingTop: "0.389em",
                                      fontWeight: 600,
                                      textAlign: "center",
                                    }}
                                  >
                                    <span>Informations</span>
                                  </h3>

                                  <p
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1em",
                                      paddingTop: "0.5em",
                                      paddingBottom: "0.5em",
                                      textAlign: "left",
                                    }}
                                  >
                                      <span>
                                        <strong>Mail :</strong> {email}
                                      </span>
                                    <br />
                                    {phone && (
                                      <>
                                        <span>
                                          <strong>Téléphone:</strong> {phone}
                                        </span>
                                        <br />
                                      </>
                                    )}
                                    {service && (
                                      <span>
                                        <strong>Service:</strong> {service}
                                      </span>
                                    )}
                                    <br />
                                    {budget && (
                                      <span>
                                        <strong>Budget:</strong> {budget}
                                      </span>
                                    )}
                                  </p>

                                  <h2
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1.8em",
                                      lineHeight: "1.44em",
                                      paddingTop: "0.389em",
                                      fontWeight: 600,
                                      textAlign: "center",
                                    }}
                                  >
                                    <span>Description</span>
                                    <br />
                                    <span style={{ fontWeight: 400, fontSize: "1em" }}>{description}</span>
                                  </h2>

                                  <p
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1em",
                                      paddingTop: "0.5em",
                                      paddingBottom: "0.5em",
                                    }}
                                  >
                                    <br />
                                  </p>

                                  <p
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      fontSize: "1em",
                                      paddingTop: "0.5em",
                                      paddingBottom: "0.5em",
                                    }}
                                  >
                                    <br />
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    );
};

export default DevisEmail;
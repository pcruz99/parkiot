//react
import { useEffect, useState } from 'react';

//react-route
import { useParams } from 'react-router';

//redux
import { useSelector } from 'react-redux';

//MUI
import { Box, Grid, Typography, Button } from '@mui/material';

//axios
import caxios from '../../scripts/customAxios.js';

import GeneralBack from 'components/GeneralBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import VehicleCard from 'components/VehicleCard';
import MessageCard from 'components/MessageCard.jsx';

const CheckShow = () => {
  //TODO: Este useSelector es para definir la cuenta del guardia y que sea parte del registro
  const account = useSelector((state) => state.account);
  const cax = caxios(account.token);
  const { uuid } = useParams();

  const [user, setUser] = useState({});
  const [vehicles, setVehicles] = useState([]);

  const [register, setRegister] = useState(null);

  const [vehicleId, setVehicleId] = useState(null);

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState(null);

  const getDataAPI = async () => {
    await cax
      .get(`/parking/check/${uuid}`)
      .then((response) => {
        if (response.status == 200) {
          setUser(response.data.user);
          setVehicles(response.data.user.vehicles);
          setRegister(response.data.register);
        }
      })
      .catch(() => {
        // console.log(error);
        setMsg('No hay datos disponibles');
        setType('warning');
        setOpen(true);
      });
  };

  const handleRegisterMessage = (reg) => {
    if (reg == null) {
      setMsg(`Registro de Entrada Existoso`);
      setType('success');
      setOpen(true);
    } else {
      setMsg(`Registro de Salida Existoso`);
      setType('success');
      setOpen(true);
    }
  };

  const registerEntry = async () => {
    if (vehicleId) {
      await cax
        .post(
          '/parking/register/entry/',
          {
            user: user.id,
            vehicle: vehicleId,
            guard: account.user._id
          },
          { timeout: 5000 }
        )
        .then((response) => {
          if (response.status === 201) {
            getDataAPI();
            handleRegisterMessage(register);
          }
        })
        .catch((error) => {
          setMsg(error?.response.data.msg[0]);
          setType('error');
          setOpen(true);
        });
    } else {
      setMsg('Necesita elegir un Vehiculo Primero');
      setType('error');
      setOpen(true);
    }
  };

  const registerDeparture = async () => {
    if (register != null) {
      await cax.put(`/parking/register/${register.id}/departure/`).then((response) => {
        if (response.status === 201) {
          setRegister(null);
          setVehicleId(null);
          handleRegisterMessage(register);
        }
      });
    }
  };

  useEffect(() => {
    getDataAPI();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GeneralBack title="Registro de Entrada y Salida">
      <Box textAlign={'center'}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ border: 1, borderColor: 'gray', borderRadius: 3, padding: 3 }}>
              <Typography variant="h2">Información del Cliente</Typography>
              <Typography variant="body1">
                <b>Nombre:</b> {user.first_name}
              </Typography>
              <Typography variant="body1">
                <b>Apellido:</b> {user.last_name}
              </Typography>
              <Typography variant="body1">
                <b>Cedula:</b>
              </Typography>
              <Typography variant="body1">
                <b>Correo:</b> {user.email}
              </Typography>
            </Box>
          </Grid>
            {vehicles.map((data) => (
              <Grid item lg={4} md={4} sm={6} xs={12} key={data.id}>
                <VehicleCard isLoading={false} vehicle={data} isForCheck={true} setVehicleId={setVehicleId} vehicleId={vehicleId} />
              </Grid>
            ))}
          <Grid item xs={6}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={register != null ? true : false}
                variant="contained"
                // type="submit"
                size="large"
                color="success"
                onClick={registerEntry}
              >
                Registrar Entrada
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={6}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={register != null ? false : true}
                variant="contained"
                // type="submit"
                size="large"
                color="error"
                onClick={registerDeparture}
              >
                Registrar Salida
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </Box>
      <MessageCard open={open} setOpen={setOpen} msg={msg} type={type} />
    </GeneralBack>
  );
};

export default CheckShow;

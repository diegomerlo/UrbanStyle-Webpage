import { Grid, TextField } from '@mui/material';
import { useFormContext, Controller } from "react-hook-form";

const AddressInput = ({ name, label, required }) => { // Asegúrate de que sea 'AddressInput'
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field} // Usa el campo de Controller
            fullWidth
            label={label}
            required={required}
          />
        )}
      />
    </Grid>
  );
};

export default AddressInput; // Asegúrate de que la exportación sea 'AddressInput'


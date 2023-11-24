import supabase from './supabase';

export async function getCities() {
  const { data, error } = await supabase.from('cities').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cities could not be loaded');
  }

  return data;
}

export async function getCity(id) {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.log(error);
    throw new Error('Cities could not be loaded');
  }

  return data;
}

export async function insertCity(newCity) {
  const { data, error } = await supabase
    .from('cities')
    .insert([newCity])
    .select();

  if (error) {
    console.log(error);
    throw new Error('City could not be added');
  }
  return data;
}

export async function deleteCity(id) {
  const { data, error } = await supabase.from('cities').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('City could not be deleted');
  }
  return data;
}

import { FormEvent, useState } from "react";
import { ActionResult, FormState } from "@/types";

export function useFormState(action: ( formData: FormData) => Promise<ActionResult> ) {
  const [state, setState] = useState<FormState>({error: null, loading: false});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({error:null,loading:true});
    const form = event.currentTarget;
    const formData = new FormData(form);
    //console.log('formData:', Object.fromEntries(formData.entries()));
    const result = await action(formData);
    if(result?.isError) {
      setState({error:result.message,loading:false});
    } else {
      setState({error:null,loading:false});
      form.reset();
    }
  };

  return {state, handleSubmit};
} 
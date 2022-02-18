import React from "react";
import { useLoginMutation } from './services/user';

export default function Nutrition() {
  const [
    loginUser,
    result,
  ] = useLoginMutation({fixedCacheKey: 'user-auth'});

  return (
    <div>
      {result?.data?.email}
    </div>
  );
}

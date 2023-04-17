import { FC, useEffect } from "react";
import { Save as SaveType } from '@prisma/client';

import { Button, H } from "~/ui";
import moment from "moment";
import { useAsync } from "~/hooks";
import { deleteSave } from "~/client-api";

type Props = JSX.IntrinsicElements['div'] & {
  save: SaveType;
  setSave: (save: SaveType) => void;
  deleteCallback?: (user: SaveType) => void;
}

export const Save: FC<Props> = (props) => {
  const [data, trigger, loading] = useAsync(deleteSave);
  const setSave = props.setSave;

  useEffect(() => {
    if (data && props.deleteCallback) props.deleteCallback(data);
  }, [loading]);

  return <div className={`group b-purple b-2 inline-block m-r-5 m-b-5 w-44 relative ${props.className}`}>
    <div className="display-none group-hover:block absolute top-0 right-0 absolute z-1">
      <Button className="bg-white" onClick={() => trigger(props.save.id)}>
        <span className="block i-mdi-close py-3"></span>
      </Button>
    </div>
    <img className="w-full" src="https://picsum.photos/id/123/200" />
    <div className="p-4">
      <H level={1}>[ID: {props.save.id}] {props.save.name}</H>
      <p>{moment(props.save.createdAt).format("DD-MM-YYYY")}</p>
      {setSave && <Button onClick={() => setSave(props.save)}>Set as save</Button>}
    </div>
  </div>
}

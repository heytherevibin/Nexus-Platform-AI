import { Fragment } from 'react';
import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { RepositoriesContent } from './RepositoriesContent';
import { useLayout } from '@/providers';

const RepositoriesPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      {currentLayout?.name === 'demo1-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Manage and monitor your code repositories</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Import Repository
              </a>
              <a href="#" className="btn btn-sm btn-primary">
                Create Repository
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <RepositoriesContent />
      </Container>
    </Fragment>
  );
};

export default RepositoriesPage; 
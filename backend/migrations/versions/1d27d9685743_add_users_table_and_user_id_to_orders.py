"""add users table and user_id to orders

Revision ID: a1b2c3d4e5f6
Revises: 2cd5eebd0bee
Create Date: 2026-03-14 16:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '2cd5eebd0bee'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
    )
    op.add_column('orders', sa.Column('user_id', sa.String(), nullable=True))
    op.create_foreign_key(
        'fk_orders_user_id',
        'orders', 'users',
        ['user_id'], ['id']
    )


def downgrade() -> None:
    op.drop_constraint('fk_orders_user_id', 'orders', type_='foreignkey')
    op.drop_column('orders', 'user_id')
    op.drop_table('users')